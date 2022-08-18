import { IProductResponse, IProductCreate } from '../interfaces/IProduct'
import ProductRepository from '../repository/ProductRepository'

class ProductService {
  async create (payload: IProductCreate): Promise<IProductResponse> {
    const result = await ProductRepository.create(payload)
    return result
  }

  async findAll (): Promise<IProductResponse[]> {
    const result = await ProductRepository.findAll()
    return result
  }
}

export default new ProductService()
