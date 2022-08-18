import { IProduct, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }
}

export default new ProductRepository()
