import express from 'express'

import authRoutes from './userRoutes'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.use('/user', authRoutes)

router.get('*', (req, res) => {
  res.status(404).render('404')
})

export default router
