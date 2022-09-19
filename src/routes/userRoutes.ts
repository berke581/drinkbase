// TODO: maybe make this into a folder: https://stackoverflow.com/questions/43856321/separate-same-level-routes-in-separate-route-files-nodejs-express

import express from 'express'
import userModel from '@src/modules/users/userModel'
// TODO: improve line below: https://github.com/typestack/typedi
import { UsersRepository } from '@src/modules/users/UsersRepository'
import { UsersService } from '@src/modules/users/UsersService'
import { UsersController } from '@src/modules/users/UsersController'
import { AuthService } from '@src/modules/auth/AuthService'
import { authGuard } from '@src/middlewares/authGuard'
import { loggedInAuthGuard } from '@src/middlewares/loggedInAuthGuard'
import { validator } from '@src/middlewares/validator'
import { userSchema } from '@src/schemas'

const usersController = new UsersController(
  new UsersService(new UsersRepository(userModel), new AuthService()),
)

const router = express.Router()

// GET
router.get('/register', loggedInAuthGuard, usersController.registerView.bind(usersController))
router.get('/login', loggedInAuthGuard, usersController.loginView.bind(usersController))
// protected routes
router.get('/profile', authGuard, usersController.profileView.bind(usersController))

// POST
router.post(
  '/register',
  loggedInAuthGuard,
  validator(userSchema),
  usersController.registerUser.bind(usersController),
)
router.post('/login', loggedInAuthGuard, usersController.loginUser.bind(usersController))
// protected routes
router.post('/logout', authGuard, usersController.logoutUser.bind(usersController))
router.post('/delete', authGuard, usersController.deleteUser.bind(usersController))

export default router
