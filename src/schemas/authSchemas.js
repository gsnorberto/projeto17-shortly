import Joi from "joi"

export const userDataFormat = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
})