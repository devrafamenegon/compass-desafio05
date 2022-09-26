/* eslint-disable @typescript-eslint/naming-convention */
import { IProductCreate, IProductQuery, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate/product'

class ProductRepository {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }

  async createMany (payload: IProductCreate[]): Promise<any> {
    return await ProductSchema.insertMany(payload)
  }

  async findAll (query: IProductQuery, offset: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    return await ProductSchema.paginate(query, {
      page: offset,
      limit,
      customLabels
    })
  }

  async findOne (id: string): Promise<IProductResponse | null> {
    return await ProductSchema.findById(id)
  }

  async findByBarcode (bar_codes: string): Promise<IProductResponse | null> {
    return await ProductSchema.findOne({ bar_codes })
  }

  async findLowStock (query: IProductQuery, offset: number, limit: number): Promise<PaginateResult<IProductResponse>> {
    return await ProductSchema.paginate(query, {
      page: offset,
      limit,
      sort: { qtd_stock: 1 },
      customLabels
    }
    )
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse | null> {
    return await ProductSchema.findByIdAndUpdate(id, payload, { new: true })
  }

  async delete (id: string): Promise<IProductResponse | null> {
    return await ProductSchema.findByIdAndDelete(id)
  }
}

export default new ProductRepository()
