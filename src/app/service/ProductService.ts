import { PaginateResult } from 'mongoose'
import { IProductResponse, IProductCreate, IProductQuery } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'

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

    const result = await ProductRepository.findAll(queryBuilded, page ?? 1)
    return result
  }

  async findOne (id: string): Promise<IProductResponse> {
    const result = await ProductRepository.findOne(id)
    return result
  }
}

export default new ProductService()
