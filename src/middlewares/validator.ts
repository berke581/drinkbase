import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { formatJoiValidationErrors } from '@src/utils/format'

export function validator(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false })
    if (validation.error) {
      req.flash('pageErrors', formatJoiValidationErrors(validation.error))

      if (req.xhr) {
        return res.status(400).json({ redirect: req.originalUrl })
      } else {
        return res.redirect('back')
      }
    }

    return next()
  }
}
