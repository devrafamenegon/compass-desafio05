/* eslint-disable @typescript-eslint/no-invalid-void-type */
import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError'
import formatJoiMessage from '../../utils/formatJoiMessage'
import { ErrorMessages } from '../../utils/error_messages'

export const queriesRules = Joi.object({
  department: Joi.string().optional().trim(),
  brand: Joi.string().optional().trim(),
  page: Joi.number().optional().min(0),
  limit: Joi.number().optional().min(1)
})

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const { error } = await queriesRules.validate(req.query, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST_QUERY, formatJoiMessage(error as Joi.ValidationError) as string))
  }
}
