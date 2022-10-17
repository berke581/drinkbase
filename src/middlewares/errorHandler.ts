import { Request, Response, NextFunction } from 'express'
import HttpError from '@src/error/HttpError'
import FlashError from '@src/error/FlashError'

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof FlashError) {
    req.flash('pageErrors', err.message)
    return res.redirect('back')
  } else if (err instanceof HttpError) {
    return res.status(err.code).render('error', { message: err.message })
  }

  next(err)
}

export default errorHandler
