import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import { UserService } from './UserService'
import HttpError from '@src/error/HttpError'

// TODO: set headers and proper status codes
export class UserController {
  constructor(private readonly _userService: UserService) {}

  registerView(req: Request, res: Response) {
    res.render('register', { formInfo: req.flash('pageErrors') })
  }

  loginView(req: Request, res: Response) {
    res.render('login', { formInfo: req.flash('pageErrors') })
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

  async registerUser(req: Request, res: Response) {
    await this._userService.registerUser(req.body)

    return res.redirect('login')
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body

    const sessionInfo = await this._userService.loginUser(username, password)

    // login is successful
    req.session.user = sessionInfo
    return res.redirect('/')
  }

  logoutUser(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        throw HttpError.InternalServerError()
      }

      return res.redirect('/')
    })
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.session.user || {}

    if (!userId) {
      return res.redirect('/')
    }

    await this._userService.deleteUser(userId)

    req.session.destroy((err) => {
      if (err) {
        throw HttpError.InternalServerError()
      }

      return res.redirect(303, '/')
    })
  }
}
