import process from 'process'
import { SignalConstants } from 'os'
import http from 'http'
import app from './app'
import logger from './logging'
import { closeDBConnection } from './loaders/db'

// preloaded env vars since i'm using imports rather than require
// https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import
const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

process.on('SIGTERM', startGracefulShutdown)
process.on('SIGINT', startGracefulShutdown)

function startGracefulShutdown(code: SignalConstants) {
  logger.info(`${code} signal received.`)
  logger.info('Closing http server.')
  server.close(onClose)
}

function onError(error: Error) {
  logger.error(error.message)
}

function onListening() {
  logger.info(`Listening on PORT: ${PORT}.`)
}

function onCloseDB() {
  logger.info('MongoDB connection closed.')
  process.exit(0)
}

function onClose() {
  logger.info('Http server closed.')

  closeDBConnection(onCloseDB)
}
