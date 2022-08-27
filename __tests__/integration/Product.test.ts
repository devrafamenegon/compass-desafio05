import mongoose from 'mongoose'
import supertest from 'supertest'
import { IProductCreate, IProductUpdate } from '../../src/app/interfaces/IProduct'
import ProductSchema from '../../src/app/schema/ProductSchema'
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

const commumPayload: IProductCreate = {
  title: 'Batata Palito',
  description: 'Batata Palito tradicional 9x9mm congelada pacote 2,5kg - McCain',
  department: 'Congelados',
  brand: 'McCain',
  qtd_stock: 2856,
  price: 29.54,
  bar_codes: '6539055340301'
}

let productId: string

describe('Product', () => {
  beforeAll(async () => {
    await ProductSchema.deleteMany({})
  })
  
  afterAll(async () => {
    await ProductSchema.deleteMany({})
    server.close()
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('create product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 201 HTTP status code', async () => {
          const response = await appTest.post('/api/v1/product').send(commumPayload)
          productId = response.body._id
          
          expect(response.statusCode).toBe(201)
        })
      })

      describe('validate payload', () => {
        it('should return a product object with valid structure', async () => {
          const productPayload: IProductCreate = {
            title: 'Leite Condensado',
            description: 'Leite Condensado Semidesnatado tetra pak 395g - Piracanjuba',
            department: 'ofertas',
            brand: 'Piracanjuba',
            qtd_stock: 966,
            price: 6.44,
            bar_codes: '4111327936030'
          }

          const response = await appTest.post('/api/v1/product').send(productPayload)
          productId = response.body._id
          
          expect(response.statusCode).toBe(201)
          expect(response.body).toEqual(expect.objectContaining({ 
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
          }))
        })

        it('should return a product object with valid values', async () => {
          const productPayload: IProductCreate = {
            title: 'Pão de Forma',
            description: 'Pão de Forma Integral pacote 400g - Visconti',
            department: 'ofertas',
            brand: 'Visconti',
            qtd_stock: 3468,
            price: 5.35,
            bar_codes: '5391671981336'
          }

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
            stock_control_enabled: true,
            bar_codes: productPayload.bar_codes,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number)
          }))
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header', async () => {
          const productPayload: IProductCreate = {
            title: 'Sabonete em Barra',
            description: 'Sabonete em Barra Água de Coco e Alecrim unidade 85g - Flor de Ypê',
            department: 'Higiene Pessoal e Perfumaria',
            brand: 'Flor de Ypê',
            qtd_stock: 3729,
            price: 1.39,
            bar_codes: '2485497064682'
          }

          const response = await appTest.post('/api/v1/product').send(productPayload)
          productId = response.body._id
          
          expect(response.statusCode).toBe(201)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })

    describe('positive + optional parameters', () => {
      
    })

    describe('negative testing – valid input', () => {
      describe('validate status code', () => {
        it('should return 400 HTTP status code when duplicated bar_codes is sended', async () => {
          const response = await appTest.post('/api/v1/product').send(commumPayload)
          
          expect(response.statusCode).toBe(400)
        })
      })

      describe('validate payload', () => {
        it('should return a valid message in error object', async () => {
          const response = await appTest.post('/api/v1/product').send(commumPayload)
          
          expect(response.statusCode).toBe(400)
          expect(response.body).toEqual({
            message: 'Bad Request Error',
            details: [
              { message: 'bar_codes already exists' }
            ]
          })
        })
      })
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('get product', () => {
    describe('basic positive tests', () => {
      
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('update product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 200 HTTP status code in patch method', async () => {
          const productPayload: IProductUpdate = {
            title: 'Anel de Cebola',
            description: 'Anel de Cebola Empanado pacote 1,05kg - McCain',
          }

          const response = await appTest.patch(`/api/v1/product/${productId}`).send(productPayload)
          
          expect(response.statusCode).toBe(200)
        })

        it('should return 200 HTTP status code in put method', async () => {
          const productPayload: IProductCreate = {
            title: 'Hambúrguer de Picanha',
            description: 'Hambúrguer de Picanha  120g - Brasa Burguers',
            department: 'Congelados',
            brand: 'Brasa Burguers',
            qtd_stock: 2776,
            price: 2.39,
            bar_codes: '1597584908736'
          }

          const response = await appTest.put(`/api/v1/product/${productId}`).send(productPayload)
          
          expect(response.statusCode).toBe(200)
        })
      })
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('delete product', () => {
    describe('basic positive tests', () => {
      
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })
})
