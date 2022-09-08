import jwt from 'jsonwebtoken'
import config from '../../config/config'

const { secret, expiresIn } = config.auth

export function createToken (user_id: string): string {
  return jwt.sign (
    { user_id },
    secret as string, 
    { expiresIn }
  )
}

export function validateToken (token: string): string | jwt.JwtPayload {
  return jwt.verify(token, secret as string)
}