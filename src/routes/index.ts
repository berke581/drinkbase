import express from 'express'

import authRoutes from './userRoutes'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

// TODO: rest of it here
router.use('/user', authRoutes)

router.get('*', (req, res) => {
  res.render('404')
})

export default router
