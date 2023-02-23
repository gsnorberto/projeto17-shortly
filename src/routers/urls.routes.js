import express from 'express'
import { addShortUrl, getShortUrl, openUrl } from '../controllers/urlsController.js'
import { checkToken } from '../middlewares/authentication.js'
import { validateUrlFormat } from '../middlewares/urlsMiddlewares.js'
let urlsRouter = express.Router()

urlsRouter.get('/urls/:id', getShortUrl)
urlsRouter.get('/urls/open/:shortUrl', openUrl)
urlsRouter.post('/urls/shorten', checkToken, validateUrlFormat, addShortUrl)
urlsRouter.delete('/urls/:id', )

export default urlsRouter