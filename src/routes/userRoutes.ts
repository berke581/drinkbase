// TODO: maybe make this into a folder: https://stackoverflow.com/questions/43856321/separate-same-level-routes-in-separate-route-files-nodejs-express

import express from 'express'
import userModel from '@src/modules/users/userModel'
// TODO: improve line below: https://github.com/typestack/typedi
import { UsersRepository } from '@src/modules/users/UsersRepository'
import { UsersService } from '@src/modules/users/UsersService'
import { UsersController } from '@src/modules/users/UsersController'

const usersController = new UsersController(new UsersService(new UsersRepository(userModel)))

const router = express.Router()

router.get('/register', usersController.registerView.bind(usersController))

router.post('/register', usersController.registerUser.bind(usersController))

export default router
