/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      department: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      qtd_stock: Joi.number().required(),
      bar_codes: Joi.string().required()
    })

    const { error } = await schema.validate(req.body, { abortEarly: true })
    if (error != null) throw error
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
