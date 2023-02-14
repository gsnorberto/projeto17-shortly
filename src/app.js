import express from 'express'
import cors from 'cors'

import urlsRouter from './routers/urls.routes.js'
import usersRouter from './routers/users.routes.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use([ urlsRouter, usersRouter ])

let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`)
})