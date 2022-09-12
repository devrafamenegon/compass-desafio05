import { CustomError } from './CustomError'

export default class NotFoundError extends CustomError {
  constructor (message: string, description: string) {
    super(
      message,
      description,
      'We could not find the resource you requested. Please refer to the documentation for the list of resources.',
      404
    )
  }
}
