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
    const result = await ProductSchema.paginate(query, { page, limit: limitDefault, customLabels })
    return result
  }

  async findOne (id: string): Promise<IProductResponse | null> {
    const result = await ProductSchema.findById(id)
    return result
  }

  async findByBarcode (barcode: string): Promise<IProductResponse | null> {
    const result = await ProductSchema.findOne({ barcode })
    return result
  }

  async findLowStock (page: number): Promise<PaginateResult<IProductResponse>> {
    const limitDefault: number = Number(process.env.DEFAULT_LIMIT_PER_PAGE ?? 50)
    const result = await ProductSchema.paginate(
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

    return result
  }

  async update (id: string, payload: IProductCreate): Promise<IProductResponse | null> {
    const result = await ProductSchema.findByIdAndUpdate(id, payload, { new: true })
    return result
  }

  async delete (id: string): Promise<IProductResponse | null> {
    const result = await ProductSchema.findByIdAndDelete(id)
    return result
  }
}

export default new ProductRepository()
