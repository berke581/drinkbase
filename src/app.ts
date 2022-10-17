import path from 'path'
import express, { urlencoded } from 'express'
import flash from 'connect-flash'
import { loadDBConfiguration } from './loaders/db'
import router from './routes'
import sessionMiddleware from './middlewares/session'
import morganMiddleware from './middlewares/morgan'
import { setIsAuth } from './middlewares/setIsAuth'
import errorLogger from './middlewares/errorLogger'
import clientErrorHandler from './middlewares/clientErrorHandler'
import errorHandler from './middlewares/errorHandler'
import failSafeErrorHandler from './middlewares/failSafeErrorHandler'

loadDBConfiguration()

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.locals.basedir = app.get('views')

// TODO: learn why this should be up top: https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session
app.use(sessionMiddleware)
app.use(morganMiddleware)
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(urlencoded({ extended: true }))
app.use(setIsAuth)
app.use(flash())
app.use('/', router) // this must come before error handler middleware
app.use(errorLogger)
app.use(clientErrorHandler)
app.use(errorHandler)
app.use(failSafeErrorHandler)

export default app
