import { IUserCreate } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async login (req: Request, res: Response) {
    const { email, password } = req.body
    const token = await UserService.login(email, password)
    return res.status(200).json({ token: token })
  }

  async create (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const payload: IUserCreate = req.body
      const result = await UserService.create(payload)
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
