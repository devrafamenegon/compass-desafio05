export default class NotFoundError extends Error {
  public readonly statusCode: number

  constructor (msg: string) {
    super(msg)
    this.name = 'Not Found Error'
    this.statusCode = 404
  }
}
