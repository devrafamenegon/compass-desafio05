export class CustomError extends Error {
  message: string
  description: string
  http_message: string
  http_code: number

  constructor (
    message: string,
    description: string,
    httpMessage: string,
    httpCode: number
  ) {
    super()
    this.message = message
    this.description = description
    this.http_message = httpMessage
    this.http_code = httpCode
  }
}
