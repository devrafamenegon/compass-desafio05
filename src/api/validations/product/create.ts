/* eslint-disable @typescript-eslint/no-invalid-void-type */
import formatJoiMessage from '../../utils/formatJoiMessage'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import BadRequestError from '../../errors/BadRequestError'
import { ErrorMessages } from '../../utils/error_messages'

export const createProductRules = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  department: Joi.string().required().trim(),
  brand: Joi.string().required().trim(),
  price: Joi.number().required().min(0.01).max(1000),
  qtd_stock: Joi.number().required().min(1).max(100000),
  bar_codes: Joi.string().required().trim().length(13)
    .pattern(/^[0-9]+$/).message('bar_codes must be a numeric string')
})

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const { error } = await createProductRules.validate(req.body, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_BODY, formatJoiMessage(error as Joi.ValidationError) as string))
  }
}
