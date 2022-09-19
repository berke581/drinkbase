import Joi from 'joi'

const postSchema = Joi.object().keys({
  title: Joi.string().required().label('Title'),
  body: Joi.string().required().label('Body'),
})

export default postSchema
