import { ServerResponse } from 'http'
import morgan, { StreamOptions } from 'morgan'
import chalk from 'chalk'
import logger from '@src/logging'

const colorizeMethod = chalk.bold.bgMagenta.cyan
const colorizeUrl = chalk.yellow

function colorizeStatusCode(res: ServerResponse) {
  const status = res.statusCode

  const colorizer =
    status >= 500
      ? chalk.red
      : status >= 400
      ? chalk.yellow
      : status >= 300
      ? chalk.cyan
      : status >= 200
      ? chalk.green
      : chalk.white

  return colorizer.bold
}

// use winston logger
const stream: StreamOptions = {
  // use the http severity
  write: (message) => logger.http(message),
}

const skip = () => {
  const env = process.env.NODE_ENV
  return env !== 'development'
}

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return [
      colorizeMethod(tokens.method(req, res)),
      colorizeUrl(tokens.url(req, res)),
      colorizeStatusCode(res)(tokens.status(req, res)),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ')
  },
  { stream, skip },
)

export default morganMiddleware
