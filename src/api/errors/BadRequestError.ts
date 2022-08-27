export default class BadRequestError extends Error {
  public readonly statusCode: number

  constructor (msg: string) {
    super(msg)
    this.name = 'Bad Request Error'
    this.statusCode = 400
  }
}
