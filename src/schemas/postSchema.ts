import Joi from 'joi'

const postSchema = Joi.object().keys({
  title: Joi.string().required().label('Title'),
  type: Joi.string().valid('cocktail', 'mocktail').required().label('Type'),
  body: Joi.string().required().label('Body'),
  image: Joi.any().required().label('Thumbnail Image'),
})

export default postSchema
