import { IProductCreate } from '../../interfaces/IProduct'
import { createProductRules } from './create'

export default async (payload: IProductCreate): Promise<string[] | string | null> => {
  const { error } = await createProductRules.validate(payload, { abortEarly: false })
  const details = error?.details.map((detail) => {
    return detail.message.replace(/"/g, '').replace(/\//g, '')
  })

  if (details !== undefined) {
    return details
  }

  return null
}
