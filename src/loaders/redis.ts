import { createClient } from 'redis'
import logger from '@src/logging'

const REDIS_URI = process.env.REDIS_URI

const redisClient = createClient({ url: REDIS_URI, legacyMode: true })
redisClient.on('error', function (err) {
  logger.error('Could not establish a connection with Redis. ' + err)
})
redisClient.on('connect', function () {
  logger.info('Connected to Redis successfully.')
})

redisClient.connect()

export default redisClient
