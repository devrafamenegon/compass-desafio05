import BadRequest from '../errors/BadRequestError'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { UserErrorMessages } from '../utils/error_messages/users/error_messages'

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return next(new BadRequest(UserErrorMessages.TOKEN_NOT_PROVIDED, 'You need to login to access this route'))

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
    if (err) return next(new BadRequest(UserErrorMessages.TOKEN_INVALID, 'You need to send a valid token'))
    return next()
  })
}