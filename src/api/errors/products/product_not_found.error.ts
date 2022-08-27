export default class ProductNotFoundError extends Error {
  public readonly statusCode: number

  constructor () {
    super('product not found')
    this.name = 'Not Found Error'
    this.statusCode = 404
  }
}
