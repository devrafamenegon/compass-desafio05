import { IProductCreate, IProductQuery, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate/product'

class ProductRepository {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    const limitDefault: number = Number(process.env.DEFAULT_LIMIT_PER_PAGE ?? 50)
    return await ProductSchema.paginate(query, { page, limit: limitDefault, customLabels })
  }

  async findOne (id: string): Promise<IProductResponse> {
    const result = await ProductSchema.findById(id)
    if (result === null) {
      throw new Error('Product not found')
    }
    return result
  }
}

export default new ProductRepository()
