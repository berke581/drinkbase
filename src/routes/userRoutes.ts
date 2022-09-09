// TODO: maybe make this into a folder: https://stackoverflow.com/questions/43856321/separate-same-level-routes-in-separate-route-files-nodejs-express

import express from 'express'
import userModel from '@src/modules/users/userModel'
// TODO: improve line below: https://github.com/typestack/typedi
import { UsersRepository } from '@src/modules/users/UsersRepository'
import { UsersService } from '@src/modules/users/UsersService'
import { UsersController } from '@src/modules/users/UsersController'
import { AuthService } from '@src/modules/auth/AuthService'
import { protectRoute } from '@src/middlewares/protectRoute'

const usersController = new UsersController(
  new UsersService(new UsersRepository(userModel), new AuthService()),
)

const router = express.Router()

// GET
router.get('/register', usersController.registerView.bind(usersController))
router.get('/login', usersController.loginView.bind(usersController))
// protected routes
router.get('/profile', protectRoute, usersController.profileView.bind(usersController))

// POST
router.post('/register', usersController.registerUser.bind(usersController))
router.post('/login', usersController.loginUser.bind(usersController))
router.post('/logout', usersController.logoutUser.bind(usersController))

export default router
