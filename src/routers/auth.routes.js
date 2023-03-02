import express from 'express'
import { signin, signup } from '../controllers/authController.js'
import { validateAuthData, validateNewUserData } from '../middlewares/authMiddlewares.js'
let authRouter = express.Router()

authRouter.post('/signup', validateNewUserData, signup)
authRouter.post('/signin', validateAuthData, signin)

export default authRouter