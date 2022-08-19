import { IProductCreate, IProductResponse } from '../interfaces/IProduct'
import ProductSchema from '../schema/ProductSchema'

class ProductRepository {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    return await ProductSchema.create(payload)
  }
}

export default new ProductRepository()
