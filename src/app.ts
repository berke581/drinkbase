import path from 'path'
import express, { urlencoded } from 'express'
import session from 'express-session'
// https://stackoverflow.com/questions/31337381/express-session-mongodb-store-connect-mongo-vs-connect-mongodb-session
// https://stackoverflow.com/questions/12081741/connect-mongo-sessions-not-being-deleted-automatically
import connectMongoDBSession from 'connect-mongodb-session'
import mongoose from 'mongoose'
import { setIsAuth } from './middlewares/setIsAuth'

import router from './routes'

const MONGO_URI = process.env.MONGO_URI
const SESSION_SECRET = process.env.SESSION_SECRET

const MongoDBSession = connectMongoDBSession(session)
const app = express()

mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected!'))

const store = new MongoDBSession({
  uri: MONGO_URI,
  collection: 'sessions',
})

// TODO: learn why this should be up top: https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }),
)

app.use(express.static('public'))

// setting the template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// this setting is for pug
// https://stackoverflow.com/questions/16525362/how-do-you-set-jade-basedir-option-in-an-express-app-the-basedir-option-is-r
// app.locals.basedir = path.join(__dirname, 'views')
app.locals.basedir = app.get('views')

app.use(urlencoded({ extended: true }))

app.use(setIsAuth)

app.use('/', router)

export default app
