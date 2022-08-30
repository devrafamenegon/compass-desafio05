import { CustomError } from "./CustomError"

export default class NotFoundError extends CustomError {
  constructor (message: string) {
    super(
      message,
      'Some internal error occurred',
      'Unexpected internal server error.',
      500
    )
    
  }
}
