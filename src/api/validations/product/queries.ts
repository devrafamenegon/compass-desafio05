/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { IProductQuery } from '../../interfaces/IProduct'
import { NextFunction, Request, Response } from 'express'
import BadRequestError from '../../errors/BadRequestError'

const acceptedKeys = ['department', 'brand', 'page']

export default async (req: Request, res: Response, next: NextFunction): Promise<Object | void> => {
  try {
    const query: IProductQuery = req.query

    for (const key in query) {
      if (!acceptedKeys.includes(key)) {
        throw new BadRequestError(`${key} is not a valid query parameter`)
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.name,
      details: [
        { message: error.message, acceptedKeys }
      ]
    })
  }
  return next()
}
