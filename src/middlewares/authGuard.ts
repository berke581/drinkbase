import { Request, Response, NextFunction } from 'express'
import HttpError from '@src/error/HttpError'

export function authGuard(req: Request, res: Response, next: NextFunction) {
  const authenticated = !!req?.session?.user

  if (!authenticated) {
    throw HttpError.Unauthorized('You are not logged in.')
  }

  return next()
}
