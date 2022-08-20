import type { IProductCreate } from 'app/interfaces/IProduct'
import { Request, Response } from 'express'
import ProductService from '../service/ProductService'

class ProductController {
  async create (req: Request, res: Response): Promise<Response> {
    try {
      const payload: IProductCreate = req.body
      const result = await ProductService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
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

  async findLowStock (req, res): Promise<Response> {
    try {
      const { page } = req.query
      const result = await ProductService.findLowStock(page)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async update (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const payload: IProductCreate = req.body
      const result = await ProductService.update(id, payload)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async delete (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

export default new ProductController()
