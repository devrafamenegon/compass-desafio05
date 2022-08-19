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

  async findAll (req, res): Promise<Response> {
    try {
      const { page, ...body } = req.query
      const result = await ProductService.findAll(body, page)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async findOne (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.findOne(id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()
