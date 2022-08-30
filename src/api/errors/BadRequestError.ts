import { CustomError } from "./CustomError"

export default class BadRequest extends CustomError {
  constructor (message: string, description: string) {
    super(
      message, 
      description,
      'Invalid syntax for this request was provided.', 
      400
    )
  }
}
