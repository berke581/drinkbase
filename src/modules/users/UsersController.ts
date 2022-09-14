import { Request, Response, NextFunction } from 'express'
import { UsersService } from './UsersService'
import { userSchema } from '@src/schemas'
import { formatJoiValidationErrors } from '@src/utils/format'

// TODO: set headers and proper status codes
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  registerView(req: Request, res: Response) {
    res.render('register', { formInfo: req.flash('registerValidationErrors') })
  }

  loginView(req: Request, res: Response) {
    res.render('login', { formInfo: req.flash('loginValidationErrors') })
  }

  async profileView(req: Request, res: Response) {
    const { username } = req.session.user || {}

    if (!username) {
      return res.redirect('/')
    }

    const userInfo = await this._usersService.getUserInfo(username)
    return res.render('profile', { userInfo })
  }

  async registerUser(req: Request, res: Response) {
    const validation = userSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
      req.flash('registerValidationErrors', formatJoiValidationErrors(validation.error))
      return res.redirect('register')
    }

    const isUsernameTaken = await this._usersService.checkIfUsernameExists(req.body.username)
    if (isUsernameTaken) {
      req.flash('registerValidationErrors', 'Username not available')
      return res.redirect('register')
    }

    const isEmailTaken = await this._usersService.checkIfEmailExists(req.body.email)
    if (isEmailTaken) {
      req.flash('registerValidationErrors', 'E-mail not available')
      return res.redirect('register')
    }

    this._usersService.registerUser(req.body)
    return res.redirect('login')
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body

    const userFound = await this._usersService.checkIfUsernameExists(username)

    if (!userFound) {
      req.flash('loginValidationErrors', 'User not found')
      return res.redirect('login')
    }

    const hashedPassword = userFound.password
    const isLoginSuccessful = await this._usersService.validatePassword(password, hashedPassword)

    if (!isLoginSuccessful) {
      req.flash('loginValidationErrors', 'Login failed')
      return res.redirect('login')
    }

    // login is successful
    req.session.user = { userId: userFound._id, username }
    return res.redirect('/')
  }

  logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        throw err
      }
    })
    // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
    return res.redirect('/')
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.session.user || {}

    if (!userId) {
      return res.redirect('/')
    }

    const isDeletionSuccessful = await this._usersService.deleteUser(userId)
    if (!isDeletionSuccessful) {
      return res.redirect('/') // TODO: redirect and show error message
    }

    req.session.destroy((err) => {
      if (err) {
        throw err
      }
    })
    return res.redirect('/')
  }
}
