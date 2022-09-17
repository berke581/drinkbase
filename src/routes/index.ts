import express from 'express'
import HttpError from '@src/error/HttpError'

import authRoutes from './userRoutes'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.use('/user', authRoutes)

router.get('*', () => {
  throw HttpError.NotFound('Page Not Found')
})

export default router
