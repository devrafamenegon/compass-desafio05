import UserRepository from "../repositories/UserRepository"
import { IUserCreate, IUserResponse } from "../interfaces/IUser"
import bcrypt from "bcrypt"
import NotFoundError from "../errors/NotFoundError"
import { UserErrorMessages } from "../utils/error_messages/user"
import BadRequestError from "../errors/BadRequestError"
import { createToken } from "../utils/tokenHandler"
import InternalServerError from "../errors/InternalServerError"

class UserService {
  async login (email: string, password: string) {
    const user = await UserRepository.findOneByEmail(email)
    if (!user) throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND, 'User with this email not found')
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new BadRequestError(UserErrorMessages.INVALID_PASSWORD, 'Password or email is invalid')
    
    const token = createToken(user)
    if (!token) throw new InternalServerError(UserErrorMessages.TOKEN_NOT_CREATED)
  
    return { token: token }
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
