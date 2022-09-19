import express from 'express'
import HttpError from '@src/error/HttpError'

import userRoutes from './userRoutes'
import postRoutes from './postRoutes'

const router = express.Router()

router.get('/', (req, res) => {
  res.redirect('/posts/browse')
})

router.use('/user', userRoutes)
router.use('/posts', postRoutes)

router.all('*', () => {
  throw HttpError.NotFound('Page Not Found')
})

export default router
