import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/CustomError'
import Logger from '../utils/logger'

export default (error: CustomError, req: Request, res: Response, next: NextFunction): Response => {
  let customError = error
  Logger.error(error)

  if (error instanceof CustomError) {
    customError = error
  } else {
    customError = new CustomError(
      'Internal Server Error',
      'Something went wrong',
      'Internal Server Error',
      500
    )
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
