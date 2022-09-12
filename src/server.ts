import http from 'http'
import app from './app'
import logger from './logging'

// preloaded env vars since i'm using imports rather than require
// https://stackoverflow.com/questions/42817339/es6-import-happening-before-env-import
const PORT = process.env.PORT

const server = http.createServer(app)

server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

function onError(error: Error) {
  logger.error(error.message)
}

function onListening() {
  logger.info(`Listening on PORT: ${PORT}.`)
}
