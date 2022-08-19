export default class InternalServerError extends Error {
  public readonly statusCode: number

  constructor (msg: string) {
    super(msg)
    this.name = 'Internal Server Error'
    this.statusCode = 500
  }
}
