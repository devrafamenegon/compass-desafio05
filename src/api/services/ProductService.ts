/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery, IProductCreateWithCsvResponse } from '../interfaces/IProduct'
import ProductRepository from '../repositories/ProductRepository'
import BadRequestError from '../errors/BadRequestError'
import isValidUuid from '../utils/isValidUuid'
import { IMulterFile } from 'api/interfaces/IMulterFile'
import createWithCsv from '../validations/product/createWithCsv'
import { ProductErrorMessages } from '../utils/error_messages/product'
import NotFoundError from '../errors/NotFoundError'
import mapper from '../../mapper/mapper.json'
import { IMapper } from 'api/interfaces/IMapper'
import InternalServerError from '../errors/InternalServerError'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    await this.checkIfBarcodesAlreadyExists(payload.bar_codes)

    const result = await ProductRepository.create(payload)
    void this.checkIfResultIsNotNull(result, ProductErrorMessages.PRODUCT_NOT_CREATED)
    return result
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const queryBuilded: {[key: string]: object | boolean} = {}
    Object.keys(query).forEach(key => {
      queryBuilded[key] = { $regex: query[key] }
    })

    queryBuilded.stock_control_enabled = true

    const result: PaginateResult<IProductResponse> = await ProductRepository.findAll(queryBuilded, page ?? 1)
    if (result.totalCount === 0) throw new NotFoundError(ProductErrorMessages.PRODUCT_NOT_FOUND, `Products not found with query: ${JSON.stringify(query)}`)
    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    await this.checkIfIsValidUuid(id)

    const result = await ProductRepository.findOne(id)
    if (result === null) throw new NotFoundError(ProductErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`)
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const result: PaginateResult<IProductResponse> = await ProductRepository.findLowStock(page ?? 1)

    if (result.totalCount === 0) throw new NotFoundError(ProductErrorMessages.PRODUCT_NOT_FOUND, 'No products found with low stock')
    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse | null> {
    await this.checkIfIsValidUuid(id)
    await this.checkIfProductInDatabase(id)
    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true

    await this.checkIfBarcodesAlreadyExists(payload.bar_codes)

    const result = await ProductRepository.update(id, payload)
    void this.checkIfResultIsNotNull(result, ProductErrorMessages.PRODUCT_NOT_UPDATED)
    return result
  }

  async delete (id: string): Promise<IProductResponse | null> {
    await this.checkIfIsValidUuid(id)
    await this.checkIfProductInDatabase(id)

    const result = await ProductRepository.delete(id)
    return result
  }

  async createWithCsv (file: IMulterFile): Promise<any> {
    if (file.mimetype !== 'text/csv') throw new BadRequestError(ProductErrorMessages.NOT_CSV_FILE, `${file.mimetype} is not a csv file`)
    if (file.size > 1000000) throw new BadRequestError(ProductErrorMessages.CSV_FILE_TOO_BIGGER, 'File is too big')

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
        ...csvFormat.reduce((acc, cur, i) => ({ ...acc, [cur]: property[i] }), {}) as IProductCreate
      }

      property.forEach((value, index) => {
        payload[csvFormat[index]] = value.replace(/"/g, '')

        payload.price = Number(payload.price.toString().replace(',', '.'))
        payload.qtd_stock = Number(payload.qtd_stock)
      })

      const payloadValidate = await createWithCsv(payload)
      const productExists = await ProductRepository.findByBarcode(payload.bar_codes)

      if (payloadValidate !== null) {
        const validatorMessages = payloadValidate as string[]
        if (productExists) validatorMessages.push(ProductErrorMessages.BARCODES_ALREADY_EXIST)
        customResult.errors++
        customResult.errors_details.push({
          title: payload.title,
          bar_codes: payload.bar_codes,
          error: validatorMessages.length > 1
            ? validatorMessages
            : validatorMessages.toString()
        })
      } else if (productExists) {
        customResult.errors++
        customResult.errors_details.push({
          title: payload.title,
          bar_codes: payload.bar_codes,
          error: ProductErrorMessages.BARCODES_ALREADY_EXIST
        })
      } else {
        customResult.success++
        await this.create(payload)
      }
    }

    return customResult
  }

  async findOneWithMapper (id: string): Promise<Object | null> {
    await this.checkIfIsValidUuid(id)
    await this.checkIfProductInDatabase(id)

    const result = await ProductRepository.findOne(id)
    void this.checkIfResultIsNotNull(result, ProductErrorMessages.PRODUCT_NOT_FOUND)

    const { fields } = mapper as IMapper

    const marketplaceObject = fields.map(field => {
      const { type, fieldProduct, fieldMarket, optional } = field

      const productLocation = fieldProduct.replace('product.', '')
      const marketLocation = fieldMarket.split('.')

      const marketObject = {}

      marketLocation.reduce((auxObj: Object, marketIndex: string) => {
        const isLastIndex = marketLocation.indexOf(marketIndex) === marketLocation.length - 1

        if (isLastIndex) {
          type === 'text'
            ? auxObj[marketIndex] = result?.[productLocation].toString()
            : type === 'number'
              ? auxObj[marketIndex] = Number(result?.[productLocation])
              : type === 'boolean'
                ? auxObj[marketIndex] = Boolean(result?.[productLocation])
                : type === 'array'
                  ? auxObj[marketIndex] = Array(result?.[productLocation])
                  : auxObj[marketIndex] = result?.[productLocation]

          if (optional) {
            const option = Object.values(optional)
            const [title, locale, currency] = option
            const stringObj = auxObj[marketIndex].toString()

            if (title === 'break') {
              auxObj[marketIndex] = stringObj.match(/.{2}/g)
              auxObj[marketIndex].push(stringObj.charAt(stringObj.length - 1))
            } else if (title === 'currency') {
              auxObj[marketIndex] = Number(auxObj[marketIndex]).toLocaleString(locale, { style: 'currency', currency })
            }

            return auxObj[marketIndex]
          }
        } else {
          return auxObj[marketIndex] = {}
        }
      }, marketObject)

      return marketObject
    })

    let mergedMarketObject = {}

    marketplaceObject.forEach(objLine => {
      mergedMarketObject = this.mergeObjLines(mergedMarketObject, objLine)
    })

    return mergedMarketObject
  }

  private async checkIfBarcodesAlreadyExists (barCodes: string): Promise<void> {
    const product = await ProductRepository.findByBarcode(barCodes)
    if (product !== null) { throw new BadRequestError(ProductErrorMessages.BARCODES_ALREADY_EXIST, 'You can not create a product with barcodes that already exist') }
  }

  private async checkIfIsValidUuid (id: string): Promise<void> {
    if (!isValidUuid(id)) throw new BadRequestError(ProductErrorMessages.INVALID_PRODUCT_ID, 'Id is not a valid uuid')
  }

  private async checkIfProductInDatabase (id: string): Promise<void> {
    const product = await ProductRepository.findOne(id)
    if (product === null) throw new NotFoundError(ProductErrorMessages.PRODUCT_NOT_FOUND, `Product not found with this id: ${id}`)
  }

  private async checkIfResultIsNotNull (result: IProductResponse | null, message: string): Promise<void> {
    if (result === null) throw new InternalServerError(message)
  }

  private isObject (item): boolean {
    return ((Boolean(item)) && typeof item === 'object' && !Array.isArray(item))
  }

  private mergeObjLines (target: Object, ...sources: Object[]): Object {
    if (sources.length === 0) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} })
          }
          this.mergeObjLines(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }

    return this.mergeObjLines(target, ...sources)
  }
}

export default new ProductService()
