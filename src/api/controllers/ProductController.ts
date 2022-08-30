import { IMulterFile } from '../interfaces/IMulterFile'
import type { IProductCreate } from 'api/interfaces/IProduct'
import { NextFunction, Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
  async create (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const payload: IProductCreate = req.body
      const result = await ProductService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async findAll (req, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { page, ...body } = req.query
      const result = await ProductService.findAll(body, page)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async findOne (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params
      const result = await ProductService.findOne(id)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async findLowStock (req, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { page } = req.query
      const result = await ProductService.findLowStock(page)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async update (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params
      const payload: IProductCreate = req.body
      const result = await ProductService.update(id, payload)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async delete (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { id } = req.params
      const result = await ProductService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      next(error)
    }
  }

  async createWithCsv (req, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const file: IMulterFile = req.file
      const result = await ProductService.createWithCsv(file)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController()
