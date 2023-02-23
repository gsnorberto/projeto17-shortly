import { urlFormat } from "../schemas/urlsSchemas.js";

export const validateUrlFormat = (req, res, next) => {
    // prevent string with blank spaces
    if (!req.body.url || req.body.url.trim().length === 0) {
        return res.status(422).send('"url" is not allowed to be empty')
    }

    const { error } = urlFormat.validate(req.body)

    if (error == null) {
        next();
    } else {
        res.status(422).send(error.details[0].message)
    }
}
