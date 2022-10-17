import { Request, Response, NextFunction } from 'express'
import HttpError from '@src/error/HttpError'

function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    if (err instanceof HttpError) {
      return res.status(err.code).json({ message: err.message })
    }
  }

  next(err)
}

export default clientErrorHandler
