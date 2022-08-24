import supertest from 'supertest'
import { IProductCreate } from '../../src/app/interfaces/IProduct'
import server from '../../src/server'

const appTest = supertest(server)

const productReturn = {
  _id: expect.any(String),
  title: expect.any(String),
  description: expect.any(String), 
  department: expect.any(String),
  brand: expect.any(String), 
  price: expect.any(Number),
  qtd_stock: expect.any(Number), 
  stock_control_enabled: expect.any(Boolean),
  bar_codes: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  __v: expect.any(Number)
}

let productId

describe('Product', () => {
  describe('create product routes', () => {
    const productPayload: IProductCreate = {
      title: 'Product',
      description: 'Description',
      department: 'Department',
      brand: 'Brand',
      qtd_stock: 100,
      price: 10.5,
      bar_codes: '1234567891012'
    }

    it('should create a product', async () => {
      const response = await appTest.post('/api/v1/product').send(productPayload)
      productId = response.body._id
      
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual(expect.objectContaining({ 
        _id: expect.any(String),
        title: productPayload.title,
        description: productPayload.description, 
        department: productPayload.department,
        brand: productPayload.brand,
        price: productPayload.price,
        qtd_stock: productPayload.qtd_stock,
        stock_control_enabled: (productPayload.qtd_stock === 0) ? false : true,
        bar_codes: productPayload.bar_codes,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number)
      }))
    })
  })

  describe('get product routes', () => {
    it('should get all products', async () => {
      const response = await appTest.get('/api/v1/product').send()
      expect(response.statusCode).toBe(200)
    })
  
    it('should get one product', async () => {
      const response = await appTest.get(`/api/v1/product/${productId}`).send()
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(productReturn))
    })
  })
})
