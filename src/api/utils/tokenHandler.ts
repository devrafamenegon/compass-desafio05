import { IUser } from '../interfaces/IUser'
import jwt from 'jsonwebtoken'
import config from '../../config/config'

const { secret, expiresIn } = config.auth

export function createToken (user: IUser): string {
  return jwt.sign (
    { content: user },
    secret as string, 
    { expiresIn: expiresIn }
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