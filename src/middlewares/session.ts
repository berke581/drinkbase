import session from 'express-session'
import connectRedis from 'connect-redis'
import redisClient from '@src/loaders/redis'

const SESSION_SECRET = process.env.SESSION_SECRET

const RedisStore = connectRedis(session)

const store = new RedisStore({
  client: redisClient,
})

export default session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
})
