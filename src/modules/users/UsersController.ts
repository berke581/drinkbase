import { Request, Response, NextFunction } from 'express'
import { UsersService } from './UsersService'
import { userSchema } from '@src/schemas'

export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  registerView(_req: Request, res: Response) {
    res.render('register')
  }

  loginView(_req: Request, res: Response) {
    res.render('login')
  }

  async profileView(_req: Request, res: Response) {
    const { username } = _req.session.user || {}
    const userInfo = username ? await this._usersService.getUserInfo(username) : null

    res.render('profile', { userInfo })
  }

  async registerUser(req: Request, res: Response) {
    const validation = userSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
      return res
        .setHeader('X-Status-Reason', 'Validation failed')
        .status(400)
        .render('register', { pageErrors: validation.error?.details })
    }

    const isUsernameTaken = await this._usersService.checkIfUsernameExists(req.body.username)
    if (isUsernameTaken) {
      return res
        .setHeader('X-Status-Reason', 'Username not available')
        .status(409)
        .render('register', { pageErrors: [{ message: 'Username not available' }] })
    }

    const isEmailTaken = await this._usersService.checkIfEmailExists(req.body.email)
    if (isEmailTaken) {
      return res
        .setHeader('X-Status-Reason', 'Email not available')
        .status(409)
        .render('register', { pageErrors: [{ message: 'Email not available' }] })
    }

    this._usersService.registerUser(req.body)
    return res.redirect('/user/login')
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body

    const userFound = await this._usersService.checkIfUsernameExists(username)

    if (!userFound) {
      return res
        .setHeader('X-Status-Reason', 'User not found')
        .status(401)
        .render('login', { pageErrors: [{ message: 'User not found' }] })
    }

    const hashedPassword = userFound.password
    const isLoginSuccessful = await this._usersService.validatePassword(password, hashedPassword)

    if (!isLoginSuccessful) {
      return res
        .setHeader('X-Status-Reason', 'Login failed')
        .status(401)
        .render('login', { pageErrors: [{ message: 'Login failed' }] })
    }

    // login is successful
    req.session.user = { username }
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
}
