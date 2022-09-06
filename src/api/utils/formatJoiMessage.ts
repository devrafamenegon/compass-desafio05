import Joi from "joi"

export default function formatJoiMessage (error: Joi.ValidationError): Array<string> | string {
  const messages = error.details.length > 1 
      ? error.details.map((error) => error.message.replace(/"/g, '').replace(/\//g, '')) 
      : error.details[0].message.replace(/"/g, '').replace(/\//g, '')

  return messages
}
