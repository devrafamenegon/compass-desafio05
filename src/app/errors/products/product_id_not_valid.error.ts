export default class ProductIdNotValidError extends Error {
  public readonly statusCode: number

  constructor () {
    super('product id is not valid')
    this.name = 'Bad Request Error'
    this.statusCode = 400
  }
}
