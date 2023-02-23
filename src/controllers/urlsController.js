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

export const getShortUrl = async (req, res) => {
    let urlId = req.params.id;

    try{
        let urlData = await db.query('SELECT * FROM urls WHERE id = $1', [urlId])
        if(urlData.rows.length === 0) return res.sendStatus(404)

        let id = urlData.rows[0].id
        let shortUrl = urlData.rows[0].short_url
        let url = urlData.rows[0].url

        res.status(200).json({id, shortUrl, url})
    } catch (error){
        res.status(500).send(error.message)
    }
}

export const openUrl = async (req, res) => {
    let shortUrl = req.params.shortUrl;

    try{
        // check if shortUrl exists
        let urlData = await db.query('SELECT * FROM urls WHERE short_url = $1', [shortUrl])
        if(urlData.rows.length === 0) return res.sendStatus(404)

        let query = `
            UPDATE urls
            SET visit_count = $1
            WHERE short_url = $2
        `

        // increase visit count
        let visitCount = urlData.rows[0].visit_count + 1
        await db.query(query, [visitCount, shortUrl])

        // redirect to destination url
        res.redirect(urlData.rows[0].url)
    } catch (error){
        res.status(500).send(error.message)
    }
}