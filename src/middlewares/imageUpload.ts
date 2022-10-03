import { createReadStream, unlinkSync } from 'fs'
import path from 'path'
import { NextFunction, Request, Response, RequestHandler } from 'express'
import multer, { FileFilterCallback, MulterError } from 'multer'
import mkdirp from 'mkdirp'
import { v4 as uuidv4 } from 'uuid'
import { ImgurClient } from 'imgur'
import { combineMiddlewares } from '@src/utils/combineMiddlewares'
import logger from '@src/logging'

const imgur = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
})

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
    const multerError = new MulterError('LIMIT_UNEXPECTED_FILE')
    multerError.message = 'Unexpected file, please select a valid image.'
    callback(multerError)
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

async function addImageInsideBody(req: Request, res: Response, next: NextFunction) {
  const { file } = req
  if (!file) {
    return next()
  }

  try {
    const filePath = file.path.replace(/\\/g, '/')

    const response = await imgur.upload({
      // TODO: fix any usage here
      image: createReadStream(filePath) as any,
      type: 'stream',
    })

    const fileField = { [file.fieldname]: response.data.link }
    req.body = { ...req.body, ...fileField }

    unlinkSync(filePath)
  } catch (err) {
    logger.error(err)
    return res.status(500).json({ message: 'An error has occurred.' }) // TODO: handle JSON errors in a more generic way
  }

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
