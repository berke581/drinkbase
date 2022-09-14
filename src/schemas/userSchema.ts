import Joi from 'joi'

const userSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(4).max(30).required().label('Username').messages({
    'any.empty': '{{#label}} is required',
    'string.min': '{{#label}} should be at least {{#limit}} characters',
    'string.max': "{{#label}} can't be longer than {{#limit}} characters",
  }),
  email: Joi.string().email().required().label('E-mail'),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .label('Password')
    .messages({
      'string.pattern.base':
        '"Password" should contain alphanumeric characters not shorter than 3 characters, and not longer than 29 characters',
    }),
  repeat_password: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .label('Repeat Password')
    .messages({
      'any.only': 'Passwords must match',
    }),
})

export default userSchema
