import { Request, Response, NextFunction } from 'express'
import HttpError from '@src/error/HttpError'
import logger from '@src/logging'

function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  logger.error(err)

  if (err instanceof HttpError) {
    return res.status(err.code).render('error', { message: err.message })
  }

  res.status(500).render('error', { message: 'Something went wrong' })
}

export default errorHandler
