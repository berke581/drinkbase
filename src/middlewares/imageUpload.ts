// TODO: check dimensions

import path from 'path'
import { NextFunction, Request, Response, RequestHandler } from 'express'
import multer, { FileFilterCallback } from 'multer'
import mkdirp from 'mkdirp'
import { v4 as uuidv4 } from 'uuid'
import { combineMiddlewares } from '@src/utils/combineMiddlewares'
import HttpError from '@src/error/HttpError'

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir = 'uploads/images/'

    mkdirp(dir)
      .then(() => callback(null, dir))
      .catch((err) => callback(err, dir))
  },
  filename: function (req, file, callback) {
    callback(null, uuidv4() + path.extname(file.originalname))
  },
})

const acceptedMimeTypes = ['image/png', 'image/gif', 'image/jpeg']
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (acceptedMimeTypes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(HttpError.BadRequest())
  }
}

const upload = multer({
  storage,
  limits: {
    // limit to 4MBs
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter,
})

function addImageInsideBody(req: Request, _res: Response, next: NextFunction) {
  const { file } = req
  if (!file) {
    return next()
  }

  const fileField = { [file.fieldname]: file.path.replace(/\\/g, '/') }
  req.body = { ...req.body, ...fileField }

  next()
}

interface ImageUpload {
  (fieldName?: string): RequestHandler
}

export const imageUpload: ImageUpload = (fieldName?: string) => {
  if (typeof fieldName === 'string') {
    return combineMiddlewares([upload.single(fieldName), addImageInsideBody])
  }

  return upload.none()
}
