import { Request, Response, NextFunction } from 'express'

// TODO: when logged in, login page shouldn't be visible
export function protectRoute(req: Request, res: Response, next: NextFunction) {
  const authenticated = !!req?.session?.user

  if (!authenticated) {
    return res.redirect('login')
  }

  return next()
}
