import { db } from "../config/database.js"

export const getUserData = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1]

    try{
        // Check if the token is valid
        let userSession = await db.query('SELECT * FROM sessions WHERE token = $1', [token])
        if(userSession.rows.length === 0) return res.sendStatus(401) // invalid token

        let query = `
            select 
                users.id as user_id, 
                users.name as user_name,
                (select sum(visit_count) from urls where user_id = users.id) as "total_visitCount",
                urls.id as url_id,
                urls.short_url,
                urls.url,
                urls.visit_count 
            from users
            join urls
                on users.id  = urls.user_id
            where users.id = $1;
        `

        let userId = userSession.rows[0].user_id
        let data = await db.query(query, [userId])

        let shortenedUrls = data.rows.map((d) => (
            {
                id: d.url_id,
			    shortUrl: d.short_url,
		        url: d.url,
			    visitCount: d.visit_count
            }
        ))

        let data_send = {
            id: data.rows[0].user_id,
            name: data.rows[0].user_name,
            visitCount: data.rows[0].total_visitCount,
            shortenedUrls
        }
        
        res.status(200).send(data_send)
    } catch (error){
        res.status(500).send(error.message)
    }
}