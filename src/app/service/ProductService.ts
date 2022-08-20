import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'
import NotFoundError from '../errors/NotFoundError'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)
    return result
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const queryBuilded: {[key: string]: object | boolean} = {}
    Object.keys(query).forEach(key => {
      queryBuilded[key] = { $regex: query[key] }
    })

    queryBuilded.stock_control_enabled = true

    const result: PaginateResult<IProductResponse> = await ProductRepository.findAll(queryBuilded, page ?? 1)

    if (result.totalCount === 0) throw new NotFoundError('Product not Found')

    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    const result = await ProductRepository.findOne(id)
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const result = await ProductRepository.findLowStock(page ?? 1)
    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { qtd_stock } = payload

    if (qtd_stock === 0) {
      payload.stock_control_enabled = false
    } else {
      payload.stock_control_enabled = true
    }

    const result = await ProductRepository.update(id, payload)
    return result
  }

  async delete (id: string): Promise<IProductResponse> {
    const result = await ProductRepository.delete(id)
    return result
  }
}

export default new ProductService()
