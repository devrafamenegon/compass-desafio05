import BadRequestError from '../errors/BadRequestError'
import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { UserErrorMessages } from '../utils/error_messages/user'

export default (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token === undefined) return next(new BadRequestError(UserErrorMessages.TOKEN_NOT_PROVIDED, 'You need to login to access this route'))

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
    if (err !== null) return next(new BadRequestError(UserErrorMessages.TOKEN_INVALID, 'You need to send a valid token'))
    return next()
  })
}
