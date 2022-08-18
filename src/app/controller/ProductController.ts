import type { IProductCreate, IProductResponse } from 'app/interfaces/IProduct'
import ProductService from '../service/ProductService'

class ProductController {
  async create (req, res): Promise<IProductResponse> {
    try {
      const payload: IProductCreate = req.body
      const result = await ProductService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async findAll (req, res): Promise<IProductResponse[]> {
    try {
      const result = await ProductService.findAll()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()
