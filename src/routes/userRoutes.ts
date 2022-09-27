// TODO: maybe make this into a folder: https://stackoverflow.com/questions/43856321/separate-same-level-routes-in-separate-route-files-nodejs-express

import express from 'express'
import userModel from '@src/modules/user/userModel'
// TODO: improve line below: https://github.com/typestack/typedi
import { UserRepository } from '@src/modules/user/UserRepository'
import { UserService } from '@src/modules/user/UserService'
import { UserController } from '@src/modules/user/UserController'
import { AuthService } from '@src/modules/auth/AuthService'
import { authGuard } from '@src/middlewares/authGuard'
import { loggedInAuthGuard } from '@src/middlewares/loggedInAuthGuard'
import { validator } from '@src/middlewares/validator'
import { userSchema } from '@src/schemas'

const userController = new UserController(
  new UserService(new UserRepository(userModel), new AuthService()),
)

const router = express.Router()

// GET
router.get('/register', loggedInAuthGuard, userController.registerView.bind(userController))
router.get('/login', loggedInAuthGuard, userController.loginView.bind(userController))
// protected routes
router.get('/profile', authGuard, userController.profileView.bind(userController))

// POST
router.post(
  '/register',
  loggedInAuthGuard,
  validator(userSchema),
  userController.registerUser.bind(userController),
)
router.post('/login', loggedInAuthGuard, userController.loginUser.bind(userController))
// protected routes
router.post('/logout', authGuard, userController.logoutUser.bind(userController))
router.post('/delete', authGuard, userController.deleteUser.bind(userController))

export default router
