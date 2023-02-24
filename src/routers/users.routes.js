import express from 'express'
import { getUserData } from '../controllers/usersController.js'
import { checkToken } from '../middlewares/authentication.js'
let usersRouter = express.Router()

usersRouter.get('/users/me', checkToken, getUserData)

export default usersRouter