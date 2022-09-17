/* eslint-disable @typescript-eslint/naming-convention */
import { IProductCreate, IProductQuery, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schemas/ProductSchema'
import { PaginateResult } from 'mongoose'
import customLabels from '../utils/paginate/product'

const limitDefault: number = Number(process.env.DEFAULT_LIMIT_PER_PAGE ?? 50)

class ProductRepository {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }

  async createMany (payload: IProductCreate[]): Promise<any> {
    return await ProductSchema.insertMany(payload)
  }

  async findAll (query: IProductQuery, page: number): Promise<PaginateResult<IProductResponse>> {
    return await ProductSchema.paginate(query, { page, limit: limitDefault, customLabels })
  }

  async findOne (id: string): Promise<IProductResponse | null> {
    return await ProductSchema.findById(id)
  }

  async findByBarcode (bar_codes: string): Promise<IProductResponse | null> {
    return await ProductSchema.findOne({ bar_codes })
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    return await ProductSchema.paginate(
      {
        stock_control_enabled: true,
        qtd_stock: { $lt: 100 }
      },
      {
        page,
        limit: limitDefault,
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
