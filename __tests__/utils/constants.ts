import { IProductCreate } from '../../src/api/interfaces/IProduct'
import { IUser } from '../../src/api/interfaces/IUser'
import { createToken } from '../../src/api/utils/tokenHandler'

export const PRODUCT: IProductCreate = {
  title: 'Batata Palito',
  description: 'Batata Palito tradicional 9x9mm congelada pacote 2,5kg - McCain',
  department: 'Congelados',
  brand: 'McCain',
  qtd_stock: 2856,
  price: 29.54,
  bar_codes: '6539055340301'
}

export const USER: IUser = {
  email: 'rafael.menegon@gmail.com',
  password: '123456',
}

const valid_token: string = createToken(USER)

export const TOKEN = { authorization: `Bearer ${valid_token}` }


