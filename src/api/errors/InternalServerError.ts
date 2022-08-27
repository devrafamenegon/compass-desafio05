export default class InternalServerError extends Error {
  public readonly statusCode: number

  constructor () {
    super('unexpected error')
    this.name = 'Internal Server Error'
    this.statusCode = 500
  }
}
