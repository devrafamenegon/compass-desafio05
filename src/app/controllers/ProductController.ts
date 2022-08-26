import { IMulterFile } from '../interfaces/IMulterFile'
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
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  async findOne (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.findOne(id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  async findLowStock (req, res): Promise<Response> {
    try {
      const { page } = req.query
      const result = await ProductService.findLowStock(page)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  async update (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const payload: IProductCreate = req.body
      const result = await ProductService.update(id, payload)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  async delete (req, res): Promise<Response> {
    try {
      const { id } = req.params
      const result = await ProductService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }

  async createWithCsv (req, res): Promise<Response> {
    try {
      const file: IMulterFile = req.file
      const result = await ProductService.createWithCsv(file)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(error.statusCode ?? 500).json({
        message: error.name,
        details: [
          { message: error.message }
        ]
      })
    }
  }
}

export default new ProductController()
