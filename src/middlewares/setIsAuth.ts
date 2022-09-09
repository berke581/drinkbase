import { Request, Response, NextFunction } from 'express'

export function setIsAuth(req: Request, res: Response, next: NextFunction) {
  const authenticated = !!req?.session?.user
  if (authenticated) {
    req.app.locals.isAuth = true
  } else {
    req.app.locals.isAuth = false
  }

  return next()
}
