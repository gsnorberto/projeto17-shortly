import express from 'express'
import { getRanking } from '../controllers/rankingController.js'
let rankingRouter = express.Router()

rankingRouter.get('/ranking', getRanking)

export default rankingRouter