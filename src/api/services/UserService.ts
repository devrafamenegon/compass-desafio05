import UserRepository from '../repositories/UserRepository'
import { IUserLogin, IUserRegister, IUserResponse } from '../interfaces/IUser'
import bcrypt from 'bcrypt'
import NotFoundError from '../errors/NotFoundError'
import { UserErrorMessages } from '../utils/error_messages/user'
import BadRequestError from '../errors/BadRequestError'
import { createToken } from '../utils/tokenHandler'
import InternalServerError from '../errors/InternalServerError'
import { ICreateToken } from 'api/interfaces/IToken'

class UserService {
  async register (payload: IUserRegister): Promise<IUserResponse> {
    const existingUser = await UserRepository.findOneByEmail(payload.email)
    if (existingUser != null) throw new BadRequestError(UserErrorMessages.USER_EMAIL_DUPLICATED, 'User with this email already exists')

    const result = await UserRepository.register(payload)
    this.checkIfResultIsNotNull(result, UserErrorMessages.USER_NOT_CREATED)
    return result
  }

  async login (payload: IUserLogin): Promise<Object> {
    const user = await UserRepository.findOneByEmail(payload.email)
    if (user == null) throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND, 'User with this email not found')

    const isPasswordValid = await bcrypt.compare(payload.password, user.password)
    if (!isPasswordValid) throw new BadRequestError(UserErrorMessages.INVALID_PASSWORD, 'Password or email is invalid')

    const tokenPayload: ICreateToken = {
      _id: user._id,
      email: user.email
    }

    const token = createToken(tokenPayload)
    if (token === '') throw new InternalServerError(UserErrorMessages.TOKEN_NOT_CREATED)

    return { token }
  }

  private checkIfResultIsNotNull (result: IUserResponse | null, message: string): void {
    if (result === null) throw new InternalServerError(message)
  }
}

export default new UserService()
