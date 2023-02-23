import { db } from "../config/database.js"
import { nanoid } from 'nanoid'

export const addShortUrl = async (req, res) => {
    let url = req.body.url.trim()
    let token = req.headers.authorization.split(' ')[1]

    try{
        // Check if url already exists
        let stUrl = await db.query('SELECT * FROM urls WHERE url = $1', [url])
        if(stUrl.rows.length > 0) return res.sendStatus(409) // url already exists
        
        // Check if the token is valid
        let userSession = await db.query('SELECT * FROM sessions WHERE token = $1', [token])
        if(userSession.rows.length === 0) return res.sendStatus(401) // invalid token

        let query = `
            INSERT INTO
                urls(user_id, url, short_url)
            VALUES ($1, $2, $3)
        `

        let shortUrl = nanoid(10) // generate short url
        
        // store url
        await db.query(query, [userSession.rows[0].user_id, url, shortUrl])
        // Get data from generated URL
        let urlGenerated = await db.query('SELECT * FROM urls WHERE url = $1', [url])

        res.status(201).json({ id: urlGenerated.rows[0].id, shortUrl })
    } catch (error){
        res.status(500).send(error.message)
    }
}