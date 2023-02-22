import express from 'express'
import { signin, signup } from '../controllers/authController.js'
import { validateAuthData, validateNewUserData } from '../middlewares/authMiddlewares.js'
let authRouter = express.Router()

authRouter.post('/sign-up', validateNewUserData, signup)
authRouter.post('/sign-in', validateAuthData, signin)

export default authRouter