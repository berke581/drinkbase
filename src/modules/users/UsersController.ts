import { Request, Response, NextFunction } from 'express'
import { UsersService } from './UsersService'
import { userSchema } from '@src/schemas'

export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  registerView(_req: Request, res: Response) {
    res.render('register')
  }

  async registerUser(req: Request, res: Response) {
    const validation = userSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
      return res
        .setHeader('X-Status-Reason', 'Validation failed')
        .status(400)
        .render('register', { pageErrors: validation.error?.details })
    }

    const isUsernameTaken = await this._usersService.checkIfUserExists(req.body.username)
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
    return res.redirect('/')
  }
}
