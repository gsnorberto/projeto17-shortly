import express from 'express'
import { addShortUrl } from '../controllers/urlsController.js'
import { checkToken } from '../middlewares/authentication.js'
import { validateUrlFormat } from '../middlewares/urlsMiddlewares.js'
let urlsRouter = express.Router()

urlsRouter.get('/urls/:id', )
urlsRouter.get('/urls/open/:shortUrl', )
urlsRouter.post('/urls/shorten', checkToken, validateUrlFormat, addShortUrl)
urlsRouter.delete('/urls/:id', )

export default urlsRouter