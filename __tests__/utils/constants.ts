import { IProductCreate } from '../../src/api/interfaces/IProduct'
import { ICreateToken } from '../../src/api/interfaces/IToken'
import { IUserRegister } from '../../src/api/interfaces/IUser'
import { createToken } from '../../src/api/utils/tokenHandler'
import productFactory from './factories/ProductFactory'
import userFactory from './factories/UserFactory'

export const BASE_URL = '/api/v1'

export const PRODUCT_CSV_FILE = `${__dirname}/files/products.csv`
export const PRODUCT_HEADLESS_CSV_FILE = `${__dirname}/files/products-without-header.csv`
export const PRODUCT_ENDPOINT = `${BASE_URL}/product`
export const PRODUCT: IProductCreate = productFactory()

export const USER_ENDPOINT = `${BASE_URL}/user`
export const USER: IUserRegister = userFactory()

const TOKEN_PAYLOAD: ICreateToken = {
  _id: '97c291f3-b035-427c-a90f-d8ceded729e0',
  email: 'rafael.menegon@gmail.com'
}

const valid_token: string = createToken(TOKEN_PAYLOAD)

export const TOKEN = { authorization: `Bearer ${valid_token}` }



