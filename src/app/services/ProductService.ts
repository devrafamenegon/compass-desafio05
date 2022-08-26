import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery, IProductCreateWithCsvResponse } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'
import NotFoundError from '../errors/NotFoundError'
import BadRequestError from '../errors/BadRequestError'
import isValidUuid from '../utils/isValidUuid'
import { IMulterFile } from 'app/interfaces/IMulterFile'
import createWithCsv from '../validations/product/createWithCsv'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    const { bar_codes } = payload
    const productWithBarcode = await ProductRepository.findByBarcode(bar_codes)

    if (productWithBarcode !== null) throw new BadRequestError('Barcode already exists')
    
    const result = await ProductRepository.create(payload)

    if (result === null) throw new BadRequestError('Product not created')
    return result
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const queryBuilded: {[key: string]: object | boolean} = {}
    Object.keys(query).forEach(key => {
      queryBuilded[key] = { $regex: query[key] }
    })

    queryBuilded.stock_control_enabled = true

    const result: PaginateResult<IProductResponse> = await ProductRepository.findAll(queryBuilded, page ?? 1)
    if (result.totalCount === 0) throw new NotFoundError('Product not found')
    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new BadRequestError('Product id is not valid')

    const result = await ProductRepository.findOne(id)
    if (result === null) throw new NotFoundError('Product not found')
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const result: PaginateResult<IProductResponse> = await ProductRepository.findLowStock(page ?? 1)

    if (result.totalCount === 0) throw new NotFoundError('Product not found')
    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new BadRequestError('Product id is not valid')

    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true

    const result = await ProductRepository.update(id, payload)
    if (result === null) throw new NotFoundError('Product not found')
    return result
  }

  async delete (id: string): Promise<IProductResponse> {
    if (!isValidUuid(id)) throw new BadRequestError('Product id is not valid')

    const result = await ProductRepository.delete(id)
    if (result === null) throw new NotFoundError('Product not found')
    return result
  }

  async createWithCsv (file: IMulterFile): Promise<any> {
    if (file.mimetype !== 'text/csv') throw new BadRequestError('File is not a csv')
    if (file.size > 1000000) throw new BadRequestError('File is too big')

    const csvFile = file.buffer.toString('utf-8').trim().split('\n')
    csvFile.shift()

    const customResult: IProductCreateWithCsvResponse = {
      success: 0,
      errors: 0,
      errors_details: []
    }

    const regexCommaToDot = /("[^",]+),([^"]+")/g

    const csvFileFormated = csvFile.map((line) => {
      const formatedLine = line.replace(/\r/g, '').replace(regexCommaToDot, function (match) {
        return match.replace(',', '.').replace(/"/g, '')
      })
      return formatedLine
    })

    for (const line of csvFileFormated) {
      const lineArray = line.split(',')

      const payload: IProductCreate = {
        title: lineArray[0],
        description: lineArray[1],
        department: lineArray[2],
        brand: lineArray[3],
        price: parseFloat(lineArray[4]),
        qtd_stock: parseInt(lineArray[5]),
        bar_codes: lineArray[6]
      }

      const payloadValidate = await createWithCsv(payload)

      if (payloadValidate !== null) {
        customResult.errors += 1
        customResult.errors_details.push({
          title: payload.title,
          bar_codes: payload.bar_codes,
          error: payloadValidate
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
