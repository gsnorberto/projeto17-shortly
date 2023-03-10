import { loginDataFormat, userDataFormat } from "../schemas/authSchemas.js"

export const validateNewUserData = (req, res, next) => {
    // prevent string with blank spaces
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(422).send('"name" is not allowed to be empty')
    }
    if (!req.body.password || req.body.password.trim().length === 0) {
        return res.status(422).send('"password" is not allowed to be empty')
    }

    const { error } = userDataFormat.validate(req.body)
    
    if (error == null) {
        next();
    } else {
        res.status(422).send(error.details[0].message)
    }
}

export const validateAuthData = (req, res, next) => {
    const { error } = loginDataFormat.validate(req.body)

    if (error == null) {
        next();
    } else {
        res.status(422).send(error.details[0].message)
    }
}