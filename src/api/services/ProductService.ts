import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery, IProductCreateWithCsvResponse } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'
import BadRequest from '../errors/BadRequestError'
import isValidUuid from '../utils/isValidUuid'
import { IMulterFile } from 'api/interfaces/IMulterFile'
import createWithCsv from '../validations/product/createWithCsv'
import InternalServer from '../errors/InternalServerError'
import { ErrorMessages } from '../utils/error_messages/products/error_messages'
import NotFoundError from '../errors/NotFoundError'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    await this.checkIfBarcodesAlreadyExists(payload.bar_codes) 
    
    const result = await ProductRepository.create(payload)
    this.checkIfResultIsNotNull(result, ErrorMessages.PRODUCT_NOT_CREATED)
    return result
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const queryBuilded: {[key: string]: object | boolean} = {}
    Object.keys(query).forEach(key => {
      queryBuilded[key] = { $regex: query[key] }
    })

    queryBuilded.stock_control_enabled = true

    const result: PaginateResult<IProductResponse> = await ProductRepository.findAll(queryBuilded, page ?? 1)
    if (result.totalCount === 0) throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND, `Products not found with query: ${JSON.stringify(query)}`)
    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    await this.checkIfIsValidUuid(id)

    const result = await ProductRepository.findOne(id)
    if (result === null) throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`)
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const result: PaginateResult<IProductResponse> = await ProductRepository.findLowStock(page ?? 1)

    if (result.totalCount === 0) throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND, 'No products found with low stock')
    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse | null> {
    await this.checkIfIsValidUuid(id)
    await this.checkIfProductInDatabase(id)
    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true

    const result = await ProductRepository.update(id, payload)
    this.checkIfResultIsNotNull(result, ErrorMessages.PRODUCT_NOT_UPDATED)
    return result
  }

  async delete (id: string): Promise<IProductResponse | null> {
    await this.checkIfIsValidUuid(id)
    await this.checkIfProductInDatabase(id)

    const result = await ProductRepository.delete(id)
    return result
  }

  async createWithCsv (file: IMulterFile): Promise<any> {
    if (file.mimetype !== 'text/csv') throw new BadRequest(ErrorMessages.NOT_CSV_FILE, `${file.mimetype} is not a csv file`)
    if (file.size > 1000000) throw new BadRequest(ErrorMessages.CSV_FILE_TOO_BIGGER, 'File is too big')

    const lines = file.buffer.toString('utf-8').trim().split('\n')
    const headers = lines[0]

    const csvFormat = headers.replace(/\r/g, '').split(',')

    const customResult: IProductCreateWithCsvResponse = {
      success: 0,
      errors: 0,
      errors_details: []
    }

    lines.shift()

    const products = lines.map(line => {
      return line.replace(/\r/g, '').split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    })

    for await (const property of products) {
      const payload: IProductCreate = {
        ...csvFormat.reduce((acc, cur, i) => ({ ...acc, [cur]: property[i] }), {})
      } as IProductCreate

      property.forEach((value, index) => {
        payload[csvFormat[index]] = value.replace(/"/g, '')
        
        payload.price = Number(payload.price.toString().replace(',', '.'))
        payload.qtd_stock = Number(payload.qtd_stock)
      })

      const payloadValidate = await createWithCsv(payload)

      if (payloadValidate !== null) {
        customResult.errors += 1
        customResult.errors_details.push({
          title: payload.title,
          bar_codes: payload.bar_codes,
          error: payloadValidate.length > 1 ? payloadValidate : payloadValidate.toString()
        })
      } else {
        customResult.success += 1
        await this.create(payload)
      }
    }

    return customResult
  }

  async findOneWithMapper (id: string) {
    const result = await ProductRepository.findOne(id)
    if (result === null) throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`)
    return result
  }

  private async checkIfBarcodesAlreadyExists (barCodes: string) {
    const product = await ProductRepository.findByBarcode(barCodes)
    if (product !== null) 
    throw new BadRequest(ErrorMessages.BARCODES_ALREADY_EXIST, 'You can not create a product with barcodes that already exist')
  }

  private async checkIfIsValidUuid (id: string) {
    if (!isValidUuid(id)) throw new BadRequest(ErrorMessages.INVALID_PRODUCT_ID, 'Id is not a valid uuid')
  }

  private async checkIfProductInDatabase (id: string) {
    const product = await ProductRepository.findOne(id)
    if (product === null) throw new NotFoundError(ErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`)
  }

  private checkIfResultIsNotNull (result: IProductResponse | null, message: string) {
    if (result === null) throw new InternalServer(message)
  }
}

export default new ProductService()
