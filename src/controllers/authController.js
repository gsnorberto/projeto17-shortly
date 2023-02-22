import { db } from "../config/database.js"
import bcrypt from "bcrypt"

export const signin = () => {

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