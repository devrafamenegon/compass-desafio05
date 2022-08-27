export default class BarCodesAlreadyExistsError extends Error {
  public readonly statusCode: number

  constructor () {
    super('bar_codes already exists')
    this.name = 'Bad Request Error'
    this.statusCode = 400
  }
}
