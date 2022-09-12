import { IProductCreate } from '../../src/api/interfaces/IProduct'
import { ICreateToken } from '../../src/api/interfaces/IToken'
import { createToken } from '../../src/api/utils/tokenHandler'

export const BASE_URL = '/api/v1'

export const PRODUCT_CSV_FILE = `${__dirname}/files/products.csv`

export const PRODUCT_ENDPOINT = `${BASE_URL}/product`
export const PRODUCT: IProductCreate = {
  title: 'Batata Palito',
  description: 'Batata Palito tradicional 9x9mm congelada pacote 2,5kg - McCain',
  department: 'Congelados',
  brand: 'McCain',
  qtd_stock: 2856,
  price: 29.54,
  bar_codes: '6539055340301'
}

export const USER_ENDPOINT = `${BASE_URL}/user`

export const USER = {
  email: 'rafael.menegon@gmail.com',
  password: '123456'
}

const TOKEN_PAYLOAD: ICreateToken = {
  _id: '97c291f3-b035-427c-a90f-d8ceded729e0',
  email: 'rafael.menegon@gmail.com'
}

const valid_token: string = createToken(TOKEN_PAYLOAD)

export const TOKEN = { authorization: `Bearer ${valid_token}` }



