import Logger from '../utils/logger'
import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/CustomError'
import InternalServerError from '../errors/InternalServerError'

export default (error: CustomError | Error, req: Request, res: Response, next: NextFunction): Response => {
  let customError

  if (error instanceof CustomError) {
    customError = error
  } else if (error instanceof Error) {
    customError = new InternalServerError(error.message)
    Logger.error(customError.stack)
  }

  return res.status(customError.http_code).json(
    {
      message: customError.message,
      description: customError.description,
      http_response: {
        message: customError.http_message,
        code: customError.http_code
      }
    }
  )
}
