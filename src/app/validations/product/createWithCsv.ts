/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { IProductCreate } from 'app/interfaces/IProduct'
import Joi from 'joi'

export default async (payload: IProductCreate): Promise<Object | void> => {
  const schema = Joi.object({
    title: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    department: Joi.string().required().trim(),
    brand: Joi.string().required().trim(),
    price: Joi.number().required().min(0.01).max(1000),
    qtd_stock: Joi.number().required().min(1).max(100000),
    bar_codes: Joi.string().required().trim().length(13)
  })

  const { error } = await schema.validate(payload, { abortEarly: false })
  const details = error?.details.map((detail) => {
    return { message: detail.message }
  })

  return details
}
