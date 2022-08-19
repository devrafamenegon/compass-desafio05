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

  async update (id: string, payload: IProductCreate): Promise<IProductResponse> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { qtd_stock } = payload

    if (qtd_stock === 0) {
      payload.stock_control_enabled = false
    } else {
      payload.stock_control_enabled = true
    }

    const result = await ProductRepository.update(id, payload)
    return result
  }

  async delete (id: string): Promise<IProductResponse> {
    const result = await ProductRepository.delete(id)
    return result
  }
}

export default new ProductService()
