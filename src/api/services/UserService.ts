import UserRepository from "../repositories/UserRepository"
import { IUserLogin, IUserRegister, IUserResponse } from "../interfaces/IUser"
import bcrypt from "bcrypt"
import NotFoundError from "../errors/NotFoundError"
import { UserErrorMessages } from "../utils/error_messages/user"
import BadRequestError from "../errors/BadRequestError"
import { createToken } from "../utils/tokenHandler"
import InternalServerError from "../errors/InternalServerError"

class UserService {
  async register (payload: IUserRegister): Promise<IUserResponse> {
    const existingUser = await UserRepository.findOneByEmail(payload.email)
    if (existingUser) throw new BadRequestError(UserErrorMessages.USER_EMAIL_DUPLICATED, 'User with this email already exists')

    const result = await UserRepository.register(payload)
    return result
  }

  async login (payload: IUserLogin) {
    const user = await UserRepository.findOneByEmail(payload.email)
    if (!user) throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND, 'User with this email not found')
    
    const isPasswordValid = await bcrypt.compare(payload.password, user.password)
    if (!isPasswordValid) throw new BadRequestError(UserErrorMessages.INVALID_PASSWORD, 'Password or email is invalid')
    
    const token = createToken(user)
    if (!token) throw new InternalServerError(UserErrorMessages.TOKEN_NOT_CREATED)
  
    return { token: token }
  }
}

export default new UserService()
