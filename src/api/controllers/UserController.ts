import { IUserCreate } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async create (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
