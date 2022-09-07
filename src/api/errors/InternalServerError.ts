import { CustomError } from "./CustomError"

export default class InternalServerError extends CustomError {
  constructor (message: string) {
    super(
      message,
      'Some internal error occurred',
      'Unexpected internal server error.',
      500
    )
    
  }
}
