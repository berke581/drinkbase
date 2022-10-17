import { inspect } from 'util'
import mongoose from 'mongoose'
import chalk from 'chalk'
import logger from '@src/logging'

const colorizeMongoose = chalk.bold.bgMagenta.cyan

export function loadDBConfiguration() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const MONGO_URI = process.env.MONGO_URI

  mongoose
    .connect(MONGO_URI)
    .then(() =>
      logger.log(
        'info',
        `${isDevelopment ? colorizeMongoose('[Mongoose]') : '[Mongoose]'} MongoDB connected!`,
      ),
    )

  // log mongodb queries only in development environment
  if (isDevelopment) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      logger.log(
        'info',
        `${colorizeMongoose('[Mongoose]')} ${collectionName}.${method}(${inspect(query, {
          colors: true,
        })}, ${inspect(doc, { colors: true })})`,
      )
    })
  }
}

type closeDBCallback = () => void
export function closeDBConnection(cb: closeDBCallback) {
  mongoose.connection.close(false, cb)
}
