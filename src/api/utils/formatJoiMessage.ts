import Joi from "joi"

export default function formatJoiMessage (error: Joi.ValidationError): Object {
  const messages = error.details.length > 1 
      ? error.details.map((error) => error.message.replace(/"/g, '').replace(/\//g, '')) 
      : error.details[0].message.replace(/"/g, '').replace(/\//g, '')

  return {
    message: 'Bad Request Error',
    details: { message: messages }
  }
}
