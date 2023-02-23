import  jwt  from "jsonwebtoken";

export const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Ex: "Bearer $gfasfgd$%6"
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.sendStatus(401)
    }

    try{
        const secret = '12asdf543' // TEMPORARY
        jwt.verify(token, secret)

        next()
    } catch (err) {
        res.sendStatus(401)
    }
}