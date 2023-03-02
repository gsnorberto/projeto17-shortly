import { db } from "../config/database.js"

export const getRanking = async (req, res) => {
    
    try {
        let query = `
            select
                users.id,
                users.name,
                count(urls.url) as "linksCount",
                coalesce(sum(urls.visit_count), 0) as "visitCount"
            from users
            left join urls
                on users.id  = urls.user_id
            group by users.id, urls.user_id
            order by "visitCount" desc
            limit 10;
        `

        let ranking = await db.query(query)
        res.status(200).send(ranking.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}