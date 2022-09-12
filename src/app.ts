import path from 'path'
import express, { urlencoded } from 'express'
import { loadDBConfiguration } from './loaders/db'
import sessionMiddleware from './middlewares/session'
import morganMiddleware from './middlewares/morgan'
import { setIsAuth } from './middlewares/setIsAuth'
import router from './routes'

loadDBConfiguration()

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.locals.basedir = app.get('views')

// TODO: learn why this should be up top: https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session
app.use(sessionMiddleware)
app.use(morganMiddleware)
app.use(express.static('public'))
app.use(urlencoded({ extended: true }))
app.use(setIsAuth)

app.use('/', router)

export default app
