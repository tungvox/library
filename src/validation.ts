import Joi from 'joi'

export const registerValidation = (data: any) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .required(),
    lastName: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    isAdmin: Joi.boolean()
      .default(false)
      .required()
  })
  return schema.validate(data)
}

export const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
  })
  return schema.validate(data)
}



