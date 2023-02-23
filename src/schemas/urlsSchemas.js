import Joi from 'joi'

export const urlFormat = Joi.object({
    url: Joi.string().required()
})