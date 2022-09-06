/* eslint-disable @typescript-eslint/no-invalid-void-type */
import formatJoiMessage from '../../utils/formatJoiMessage'
import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { createUserRules } from './create'
import BadRequest from '../../errors/BadRequestError'
import { ErrorMessages } from '../../utils/error_messages'

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const { error } = await createUserRules.validate(req.body, { abortEarly: false })
    if (error != null) throw error
    return next()
  } catch (error) {
    return next(new BadRequest(ErrorMessages.BAD_REQUEST, formatJoiMessage(error as Joi.ValidationError) as string ))
  }
}
