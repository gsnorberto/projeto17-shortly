import express from 'express'
let usersRouter = express.Router()

usersRouter.post('/users/me')

export default usersRouter