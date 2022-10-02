import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import { UserService } from './UserService'
import HttpError from '@src/error/HttpError'

// TODO: express-async-handler
// https://stackoverflow.com/questions/63228668/typescript-express-error-handling-middleware
// https://www.npmjs.com/package/express-async-handler

// TODO: set headers and proper status codes
export class UserController {
  constructor(private readonly _userService: UserService) {}

  registerView(req: Request, res: Response) {
    res.render('register', { formInfo: req.flash('validationErrors') })
  }

  loginView(req: Request, res: Response) {
    res.render('login', { formInfo: req.flash('validationErrors') })
  }

  async profileView(req: Request, res: Response, next: NextFunction) {
    const { username } = req.session.user || {}

    // TODO: use id
    if (!username) {
      const err = HttpError.Unauthorized()
      return next(err)
    }

    const formInfo = req.flash('deletionErrors')
    const userInfo = await this._userService.getUserInfo(username)
    if (!userInfo) {
      return next(HttpError.NotFound())
    }

    const { _createdAt, ...userRest } = userInfo
    const parsedUserInfo = {
      _createdAt: moment(_createdAt).format('DD.MM.YYYY HH:mm'),
      ...userRest,
    }

    return res.render('profile', { userInfo: parsedUserInfo, formInfo })
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    const isUsernameTaken = await this._userService.checkIfUsernameExists(req.body.username)
    if (isUsernameTaken) {
      req.flash('validationErrors', 'Username not available')
      return res.redirect('register')
    }

    const isEmailTaken = await this._userService.checkIfEmailExists(req.body.email)
    if (isEmailTaken) {
      req.flash('validationErrors', 'E-mail not available')
      return res.redirect('register')
    }

    try {
      await this._userService.registerUser(req.body)
    } catch (err) {
      return next(err)
    }
    return res.redirect('login')
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body

    const userFound = await this._userService.checkIfUsernameExists(username)

    if (!userFound) {
      req.flash('validationErrors', 'User not found')
      return res.redirect('login')
    }

    const hashedPassword = userFound.password
    const isLoginSuccessful = await this._userService.validatePassword(password, hashedPassword)

    if (!isLoginSuccessful) {
      req.flash('validationErrors', 'Login failed')
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
    // https://stackoverflow.com/questions/32728913/weird-redirect-bug-post-redirect-to-same-page-does-not-update
    return res.redirect('/')
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session.user || {}

    if (!userId) {
      return res.redirect('/')
    }

    try {
      await this._userService.deleteUser(userId) // TODO: confirmation
    } catch (err) {
      return next(err)
    }

    req.session.destroy((err) => {
      if (err) {
        throw err
      }
    })
    return res.redirect(303, '/')
  }
}
