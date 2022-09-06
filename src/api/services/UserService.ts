import UserRepository from "../repositories/UserRepository"
import { IUserCreate, IUserResponse } from "../interfaces/IUser"
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"

class UserService {
  async login (email: string, password: string) {
    const user = await UserRepository.findOneByEmail(email)
    if (!user) throw new Error('User not found')
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid password')

    const secret = process.env.JWT_SECRET as string
    const token = sign({ id: user._id,}, secret, { expiresIn: process.env.JWT_EXPIRES_IN })

    return token
  }

  async create (payload: IUserCreate): Promise<IUserResponse> {
    const result = await UserRepository.create(payload)
    return result
  }

  async findOne (id: string): Promise<IUserResponse | null> {
    return await UserRepository.findOne(id)
  }
}

export default new UserService()