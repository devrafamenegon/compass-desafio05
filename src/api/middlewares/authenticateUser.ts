import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
    if (err) return res.status(401).send()
    return next()
  })
}