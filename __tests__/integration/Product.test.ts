import mongoose from 'mongoose'
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
  afterAll(async () => {
    server.close()
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

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

  describe('update product routes', () => {
    it('should update all properties of one product', async () => {
      const product: IProductCreate = {
        title: 'Product 2',
        description: 'Description 2',
        department: 'Department 2',
        brand: 'Brand 2',
        qtd_stock: 100,
        price: 10.5,
        bar_codes: '1234567891012'
      }

      const response = await appTest.put(`/api/v1/product/${productId}`).send(product)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(productReturn))
    })

    it('should update one or more properties of one product', async () => {
      const product = {
        title: 'Product 3',
        description: 'Description 3',
        department: 'Department 3',
      }

      const response = await appTest.patch(`/api/v1/product/${productId}`).send(product)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expect.objectContaining(productReturn))
    })
  })

  describe('delete product route', () => {
    it('should delete one product', async () => {
      const response = await appTest.delete(`/api/v1/product/${productId}`).send()
      expect(response.statusCode).toBe(204)
      expect(response.body).toEqual({})
    })
  })
})
