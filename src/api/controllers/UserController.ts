import { IUserRegister, IUserLogin } from '../interfaces/IUser'
import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  async login (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
    const payload: IUserLogin = req.body
    const token = await UserService.login(payload)
    return res.status(200).json(token)
    } catch (error) {
      next(error)
    }
  }

  async register (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const payload: IUserRegister = req.body
      const result = await UserService.register(payload)
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
