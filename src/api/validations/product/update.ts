/* eslint-disable @typescript-eslint/no-invalid-void-type */
import BadRequestError from '../../errors/BadRequestError'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import formatJoiMessage from '../../utils/formatJoiMessage'
import { ErrorMessages } from '../../utils/error_messages'

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    let schema
    if (req.method === 'PUT') {
      schema = Joi.object({
        title: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        department: Joi.string().required().trim(),
        brand: Joi.string().required().trim(),
        price: Joi.number().required().min(0.01).max(1000),
        qtd_stock: Joi.number().required().min(0).max(100000),
        bar_codes: Joi.string().required().trim().length(13).pattern(/^[0-9]+$/)
      })
    } else if (req.method === 'PATCH') {
      schema = Joi.object({
        title: Joi.string().optional().trim(),
        description: Joi.string().optional().trim(),
        department: Joi.string().optional().trim(),
        brand: Joi.string().optional().trim(),
        price: Joi.number().optional().min(0.01).max(1000),
        qtd_stock: Joi.number().optional().min(0).max(100000),
        bar_codes: Joi.string().optional().trim().length(13).pattern(/^[0-9]+$/)
      })
    } else {
      throw new BadRequestError('Invalid method', 'Only PUT and PATCH methods are allowed')
    }

    const { error } = await schema.validate(req.body, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST, formatJoiMessage(error as Joi.ValidationError) as string ))
  }
}
