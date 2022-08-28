import request from 'supertest'
import { IProductCreate, IProductUpdate } from '../../src/api/interfaces/IProduct'
import app from '../../src/app'

const appTest = request(app)

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

const productReturnWithPagination = {
  limit: expect.any(Number),
  page: expect.any(Number),
  totalPages: expect.any(Number),
  total: expect.any(Number),
  products: expect.arrayContaining([
    expect.objectContaining(productReturn)
  ])
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
          
          expect(response.statusCode).toBe(201)
          expect(response.body).toEqual(expect.objectContaining(productReturn))
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
          
          expect(response.statusCode).toBe(201)
          expect(response.body).toEqual(expect.objectContaining({
            ...productReturn,
            ...productPayload
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
          
          expect(response.statusCode).toBe(201)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })

    describe('positive + optional parameters', () => {
      // TODO
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
      // TODO
    })

    describe('destructive testing', () => {
      // TODO
    })
  })

  describe('get product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 200 HTTP status code in get all products', async () => {
          const response = await appTest.get('/api/v1/product/')
          expect(response.statusCode).toBe(200)
        })

        it('should return 200 HTTP status code in get one product', async () => {
          const response = await appTest.get(`/api/v1/product/${productId}`)
          expect(response.statusCode).toBe(200)
        })
      })

      describe('validate payload', () => {
        it('should return a list of products object with valid structure in get all products', async () => {
          const response = await appTest.get('/api/v1/product')
          
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
        })

        it('should return a list of products object with valid structure in get one product', async () => {
          const response = await appTest.get(`/api/v1/product/${productId}`)
          
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining(productReturn))
        })

        it('should return a list of products object with valid values in get one product', async () => {
          const response = await appTest.get(`/api/v1/product/${productId}`)
          
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productReturn,
            ...commumPayload
          }))
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header in get all products', async () => {
          const response = await appTest.get('/api/v1/product')
          
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })

        it('should return a valid content-type header in get one product', async () => {
          const response = await appTest.get(`/api/v1/product/${productId}`)
          
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })

    describe('positive + optional parameters	', () => {
      describe('validate status code', () => {
        describe('should return 200 HTTP status code in get all products', () => {
          it('with page param', async () => {
            const response = await appTest.get('/api/v1/product?page=1')
            expect(response.statusCode).toBe(200)
          })
          it('with brand param', async () => {
            const response = await appTest.get('/api/v1/product?brand=McCain')
            expect(response.statusCode).toBe(200)
          })

          it('with department param', async () => {
            const response = await appTest.get('/api/v1/product?department=Congelados')
            expect(response.statusCode).toBe(200)
          })

          it('with page, brand and department params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&brand=McCain&department=Congelados')
            expect(response.statusCode).toBe(200)
          })

          it('with page and brand params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&brand=McCain')
            expect(response.statusCode).toBe(200)
          })

          it('with page and department params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&department=Congelados')
            expect(response.statusCode).toBe(200)
          })

          it('with brand and department params', async () => {
            const response = await appTest.get('/api/v1/product?brand=McCain&department=Congelados')
            expect(response.statusCode).toBe(200)
          })
        })
      })
      describe('validate payload', () => {
        describe('should return a list of products object with valid structure in get all products', () => {
          it('with page param', async () => {
            const response = await appTest.get('/api/v1/product?page=1')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with brand param', async () => {
            const response = await appTest.get('/api/v1/product?brand=McCain')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with department param', async () => {
            const response = await appTest.get('/api/v1/product?department=Congelados')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with page, brand and department params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&brand=McCain&department=Congelados')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with page and brand params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&brand=McCain')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with page and department params', async () => {
            const response = await appTest.get('/api/v1/product?page=1&department=Congelados')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })

          it('with brand and department params', async () => {
            const response = await appTest.get('/api/v1/product?brand=McCain&department=Congelados')
            expect(response.statusCode).toBe(200)
            expect(response.body).toEqual(expect.objectContaining(productReturnWithPagination))
          })
        })
      })
    })

    describe('negative testing – valid input', () => {
      // TODO
    })

    describe('negative testing – invalid input', () => {
      // TODO
    })

    describe('destructive testing', () => {
      // TODO
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

      describe('validate payload', () => {
        it('should return a product object with valid structure in patch', async () => {
          const productPayload: IProductUpdate = {
            title: 'Embalagem para Pizza',
            description: 'Embalagem para Pizza Oitavada 35cm Estampado pacote 25 unidades - São José',
          }

          const response = await appTest.patch(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
        })

        it('should return a product object with valid structure in put', async () => {
          const productPayload: IProductCreate = {
            title: 'Leite em Pó',
            description: 'Leite em Pó Integral pacote 400g - Italac,Frios e Laticínios',
            department: 'Frios e Laticínios',
            brand: 'Italac',
            qtd_stock: 1400,
            price: 19.01,
            bar_codes: '4508633240598'
          }

          const response = await appTest.put(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining(productReturn))
        })

        it('should return a product object with valid values in patch', async () => {
          const productPayload: IProductUpdate = {
            title: 'Whisky',
            description: 'Whisky Escocês garrafa 1 Litro - White Horse',
          }

          const response = await appTest.patch(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productReturn,
            ...productPayload
          }))
        })

        it('should return a product object with valid values in put', async () => {
          const productPayload: IProductCreate = {
            title: 'Beterraba',
            description: 'Beterraba  por kg - Dois Cunhados',
            department: 'Hortifruti',
            brand: 'Dois Cunhados',
            qtd_stock: 364,
            price: 8.99,
            bar_codes: '2484081116237'
          }

          const response = await appTest.put(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productReturn,
            ...productPayload
          }))
        })
      })

      describe('validate headers', () => {
        it('should return a valid content-type header in response of patch method', async () => {
          const productPayload: IProductUpdate = {
            title: 'Refrigerante',
            description: 'Refrigerante lata 350ml - Coca-Cola,Bebidas',
          }

          const response = await appTest.patch(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })

        it('should return a valid content-type header in response of put method', async () => {
          const productPayload: IProductCreate = {
            title: 'Seleta de Legumes',
            description: 'Seleta de Legumes congelada pacote 1,02kg - Pratigel',
            department: 'Congelados',
            brand: 'Pratigel',
            qtd_stock: 1640,
            price: 9.36,
            bar_codes: '4835433821676'
          }

          const response = await appTest.put(`/api/v1/product/${productId}`).send(productPayload)
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })

    describe('positive + optional parameters	', () => {
      // TODO
    })

    describe('negative testing – valid input', () => {
      // TODO
    })

    describe('negative testing – invalid input', () => {
      // TODO
    })

    describe('destructive testing', () => {
      // TODO
    })
  })

  describe('delete product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 204 HTTP status code', async () => {
          const response = await appTest.delete(`/api/v1/product/${productId}`)
          
          expect(response.statusCode).toBe(204)
        })
      })
      describe('validate status code', () => {
        it('should return empty body in response', async () => {
          const { body } = await appTest.post('/api/v1/product').send(commumPayload)
          const response = await appTest.delete(`/api/v1/product/${body._id}`)
          
          expect(response.statusCode).toBe(204)
          expect(response.body).toEqual({})
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header in response of patch method', async () => {
          const { body } = await appTest.post('/api/v1/product').send(commumPayload)
          const response = await appTest.delete(`/api/v1/product/${body._id}`)
          
          expect(response.statusCode).toBe(204)
          expect(response.headers['content-type']).toEqual(undefined)
        })
      })
    })

    describe('positive + optional parameters	', () => {
      // TODO
    })

    describe('negative testing – valid input', () => {
      // TODO
    })

    describe('negative testing – invalid input', () => {
      // TODO
    })

    describe('destructive testing', () => {
      // TODO
    })
  })
})
