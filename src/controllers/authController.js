import { db } from "../config/database.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const signin = async (req, res) => {
    let { email, password } = req.body

    try {
        //check if user exists
        let user = await db.query('SELECT * FROM users WHERE email = $1', [email])
        // user not found
        if (user.rows.length === 0) return res.sendStatus(401)

        // check password
        const checkPassword = await bcrypt.compare(password, user.rows[0].password)
        // invalid password
        if (!checkPassword) return res.sendStatus(401)

        // Create Token JWT
        const secret = '12asdf543' // TEMPORARY
        const token = jwt.sign({ id: user.rows[0].id }, secret)

        // check if authentication already exists
        let userAuth = await db.query('SELECT * FROM sessions WHERE user_id = $1', [user.rows[0].id])

        let query;
        if (userAuth.rows.length !== 0) { // 
            query = `
                UPDATE sessions
                SET token = $1
                WHERE user_id = $2
            `
        } else {
            query = `
                INSERT INTO 
                    sessions (token, user_id)
                VALUES
                    ($1, $2)
            `
        }

        await db.query(query, [token, user.rows[0].id])

        // successful login
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export const signup = async (req, res) => {
    let name = req.body.name.trim();
    let email = req.body.email.trim();
    let password = req.body.password;

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    let passwordHash = await bcrypt.hash(password, salt)

    try {
        //check if user already exists
        let user = await db.query("SELECT * FROM users WHERE email = $1", [email])
        if (user.rows.length !== 0) return res.sendStatus(409)

        let query = `
            INSERT INTO 
                users (name, email, password)
            VALUES
                ($1, $2, $3)
        `

        await db.query(query, [name, email, passwordHash])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}