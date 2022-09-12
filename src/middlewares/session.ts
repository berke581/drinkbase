import session from 'express-session'
// https://stackoverflow.com/questions/31337381/express-session-mongodb-store-connect-mongo-vs-connect-mongodb-session
// https://stackoverflow.com/questions/12081741/connect-mongo-sessions-not-being-deleted-automatically
import connectMongoDBSession from 'connect-mongodb-session'

const SESSION_SECRET = process.env.SESSION_SECRET
const MONGO_URI = process.env.MONGO_URI

const MongoDBSession = connectMongoDBSession(session)

const store = new MongoDBSession({
  uri: MONGO_URI,
  collection: 'sessions',
})

export default session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
})
