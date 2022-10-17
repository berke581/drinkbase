import { NextFunction, Request, Response } from 'express'

function failSafeErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (req.xhr) {
    res.status(500).json({ message: 'Internal server error' })
  } else {
    res.status(500).render('error', { message: 'Internal server error' })
  }

  next()
}

export default failSafeErrorHandler
