/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const createProductRules = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  department: Joi.string().required().trim(),
  brand: Joi.string().required().trim(),
  price: Joi.number().required().min(0.01).max(1000),
  qtd_stock: Joi.number().required().min(1).max(100000),
  bar_codes: Joi.string().required().trim().length(13)
})

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const { error } = await createProductRules.validate(req.body, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return res.status(400).json({
      message: 'Bad Request Error',
      details: error.details
    })
  }
}
