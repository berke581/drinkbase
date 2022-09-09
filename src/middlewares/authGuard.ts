import { Request, Response, NextFunction } from 'express'

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const authenticated = !!req?.session?.user

  if (!authenticated) {
    return res.redirect('login')
  }

  return next()
}
