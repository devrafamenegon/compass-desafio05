import jwt from 'jsonwebtoken'
import config from '../../config/config'
import { ICreateToken } from 'api/interfaces/IToken'

const { secret, expiresIn } = config.auth

export function createToken (user: (ICreateToken)): string {
  return jwt.sign(
    { content: user },
    secret as string,
    { expiresIn }
  )
}

export function isValidToken (token: string): boolean {
  try {
    jwt.verify(token, secret as string)
    return true
  } catch (e) {
    return false
  }
}
