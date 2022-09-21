import { Request, Response, NextFunction, RequestHandler } from 'express'

export function combineMiddlewares(middlewares: RequestHandler[]): RequestHandler {
  return middlewares.reduce(function (a, b) {
    return function (req: Request, res: Response, next: NextFunction) {
      a(req, res, function (err) {
        if (err) {
          return next(err)
        }
        b(req, res, next)
      })
    }
  })
}
