import path from 'path'
import express, { urlencoded, Request, Response } from 'express'
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

const MongoDBSession = connectMongoDBSession(session)
const app = express()

mongoose.connect(MONGO_URI).then(() => console.log('MongoDB connected!'))

// const store = new MongoDBSession({
//   uri: MONGO_URI as string,
//   collection: 'sessions',
// })

// this setting is for pug
// https://stackoverflow.com/questions/16525362/how-do-you-set-jade-basedir-option-in-an-express-app-the-basedir-option-is-r
app.locals.basedir = path.join(__dirname, 'views')
// app.locals.basedir = app.get('views');

app.use(express.static('public'))

// setting the template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(urlencoded({ extended: true }))

// app.use(
//   session({
//     secret: 'TODO_SECRET',
//     resave: false,
//     saveUninitialized: false,
//     store,
//   }),
// )

app.get('/', (req, res) => {
  res.render('index')
})

app.get('*', (req, res) => {
  res.render('404')
})

export default app
