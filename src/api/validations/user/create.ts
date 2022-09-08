import formatJoiMessage from '../../utils/formatJoiMessage'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import BadRequestError from '../../errors/BadRequestError'
import { ErrorMessages } from '../../utils/error_messages'

export const createUserRules = Joi.object({
  email: Joi.string().email().required().trim().max(320),
  password: Joi.string().required().min(6).max(20).trim()
})

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const { error } = await createUserRules.validate(req.body, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return next(new BadRequestError(ErrorMessages.BAD_REQUEST, formatJoiMessage(error as Joi.ValidationError) as string ))
  }
}