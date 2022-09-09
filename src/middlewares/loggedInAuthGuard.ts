import { Request, Response, NextFunction } from 'express'

export function loggedInAuthGuard(req: Request, res: Response, next: NextFunction) {
  const authenticated = !!req?.session?.user

  if (authenticated) {
    return res.redirect('/')
  }

  return next()
}
