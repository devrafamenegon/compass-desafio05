import { CustomError } from './CustomError'

export default class UnauthorizedError extends CustomError {
  constructor (message: string, description: string) {
    super(
      message,
      description,
      'You are unauthorized to access the requested resource. Please log in.',
      401
    )
  }
}
