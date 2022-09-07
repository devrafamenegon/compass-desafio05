import UserRepository from "../repositories/UserRepository"
import bcrypt from "bcrypt"
import NotFoundError from "../errors/NotFoundError"
import { UserErrorMessages } from "../utils/error_messages/users/error_messages"
import BadRequest from "../errors/BadRequestError"
import { createToken } from "api/utils/isValidToken"
import InternalServerError from "../errors/InternalServerError"

class AuthService {
  async auth (email: string, password: string) {
    const user = await UserRepository.findOneByEmail(email)
    if (!user) throw new NotFoundError(UserErrorMessages.USER_NOT_FOUND, 'User with this email not found')
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new BadRequest(UserErrorMessages.INVALID_PASSWORD, 'Password or email is invalid')

    const token = createToken(user._id as string)
    if (!token) throw new InternalServerError(UserErrorMessages.TOKEN_NOT_CREATED)
  
    return token
  }
}

export default new AuthService()
