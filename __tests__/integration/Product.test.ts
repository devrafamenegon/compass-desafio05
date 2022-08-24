import supertest from 'supertest'
import { IProductCreate } from '../../src/app/interfaces/IProduct'
import server from '../../src/server'

const appTest = supertest(server)

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
})
