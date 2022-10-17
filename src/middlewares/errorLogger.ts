import { Request, Response, NextFunction } from 'express'
import logger from '@src/logging'

function errorLogger(err: Error, _req: Request, _res: Response, next: NextFunction) {
  logger.error(err)

  next(err)
}

export default errorLogger
