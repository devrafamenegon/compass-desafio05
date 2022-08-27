import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery, IProductCreateWithCsvResponse } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'
import BadRequestError from '../errors/BadRequestError'
import isValidUuid from '../utils/isValidUuid'
import { IMulterFile } from 'api/interfaces/IMulterFile'
import createWithCsv from '../validations/product/createWithCsv'
import InternalServerError from '../errors/InternalServerError'
import ProductNotFoundError from '../errors/products/product_not_found.error'
import ProductIdNotValidError from '../errors/products/product_id_not_valid.error'
import BarCodesAlreadyExistsError from '../errors/products/barcodes_already_exists.error'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    const { bar_codes } = payload
    const productWithBarcode = await ProductRepository.findByBarcode(bar_codes)

    if (productWithBarcode !== null) throw new BarCodesAlreadyExistsError()
    
    const result = await ProductRepository.create(payload)

    if (result === null) throw new InternalServerError()
    return result
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const queryBuilded: {[key: string]: object | boolean} = {}
    Object.keys(query).forEach(key => {
      queryBuilded[key] = { $regex: query[key] }
    })

    queryBuilded.stock_control_enabled = true

    const result: PaginateResult<IProductResponse> = await ProductRepository.findAll(queryBuilded, page ?? 1)
    if (result.totalCount === 0) throw new ProductNotFoundError()
    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new ProductIdNotValidError()

    const result = await ProductRepository.findOne(id)
    if (result === null) throw new ProductNotFoundError()
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const result: PaginateResult<IProductResponse> = await ProductRepository.findLowStock(page ?? 1)

    if (result.totalCount === 0) throw new ProductNotFoundError()
    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new ProductIdNotValidError()

    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true

    const result = await ProductRepository.update(id, payload)
    if (result === null) throw new ProductNotFoundError()
    return result
  }

  async delete (id: string): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new ProductIdNotValidError()

    const result = await ProductRepository.delete(id)
    if (result === null) throw new ProductNotFoundError()
    return result
  }

  async createWithCsv (file: IMulterFile): Promise<any> {
    if (file.mimetype !== 'text/csv') throw new BadRequestError('file is not a csv')
    if (file.size > 1000000) throw new BadRequestError('file is too big')

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
}

export default new ProductService()
