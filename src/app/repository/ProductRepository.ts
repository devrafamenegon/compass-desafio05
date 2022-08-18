import { IProductCreate, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'

class ProductRepository {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }

  async findAll (): Promise<IProductResponse[]> {
    return await ProductSchema.find({ stock_control_enabled: true })
  }
}

export default new ProductRepository()
