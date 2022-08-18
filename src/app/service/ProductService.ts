import { IProductResponse, IProduct } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'

class ProductService {
  async create (payload: IProduct): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)
    return result
  }
}

export default new ProductService()
