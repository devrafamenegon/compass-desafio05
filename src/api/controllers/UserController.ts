import { IUserCreate } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async login (req: Request, res: Response) {
    const { email, password } = req.body
    const token = await UserService.login(email, password)
    return res.status(200).json(token)
  }

  async register (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const payload: IUserCreate = req.body
      const result = await UserService.register(payload)
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async findAll (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const result = await UserService.findAll()
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
