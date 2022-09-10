import { IProductCreate, IProductUpdate } from '../../src/api/interfaces/IProduct'
import { requestApp } from '../setup'
import { TOKEN } from '../utils/constants'
import productFactory from '../utils/factories/ProductFactory'
import { checkErrorFormat } from '../utils/formats/ErrorFormat'
import { checkPaginateProductsFormat, checkProductFormat, productResponse } from '../utils/formats/ProductFormat'

describe('Product', () => {
  describe('create product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 201 HTTP status code', async () => {
          const temp = productFactory()
          const response = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          expect(response.statusCode).toBe(201)
        })
      })

      describe('validate payload', () => {
        it('should return a product object with valid structure', async () => {
          const temp = productFactory()
          const { body, status } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          expect(status).toBe(201)
          checkProductFormat(body)
        })

        it('should return a product object with valid values', async () => {
          const temp = productFactory()
          const response = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          expect(response.statusCode).toBe(201)
          expect(response.body).toEqual(expect.objectContaining({
            ...productResponse,
            ...temp
          }))
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header', async () => {
          const temp = productFactory()
          const response = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
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
          const temp = productFactory()
          await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          const response = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          expect(response.statusCode).toBe(400)
        })
      })

      describe('validate payload', () => {
        it('should return a valid message in error object when try to create a duplicated bar_codes', async () => {
          const temp = productFactory()
          await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const { body, status } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          expect(status).toBe(400)
          checkErrorFormat(body)
        })
      })
    })

    describe('negative testing – invalid input', () => {
      describe('validate status code', () => {
        it('should return 400 HTTP status code when invalid bar_codes is send', async () => {
          const temp = productFactory()
          
          const invalidBarcodes = {
            ...temp,
            bar_codes: '65390553403019'
          }

          const response = await requestApp.post('/api/v1/product').set(TOKEN).send(invalidBarcodes)
          
          expect(response.statusCode).toBe(400)
        })
      })

      describe('validate payload', () => {
        it('should return a valid structure in error object when invalid bar_codes is send', async () => {
          const temp = productFactory()
          
          const invalidBarcodes = {
            ...temp,
            bar_codes: '65390553403019'
          }

          const { body, status } = await requestApp.post('/api/v1/product').set(TOKEN).send(invalidBarcodes)
          
          expect(status).toBe(400)
          checkErrorFormat(body)
        })

        it('should return a valid values in error object when invalid bar_codes is send', async () => {
          const temp = productFactory()
          
          const invalidBarcodes = {
            ...temp,
            bar_codes: '65390553403019'
          }

          const { body, status } = await requestApp.post('/api/v1/product').set(TOKEN).send(invalidBarcodes)
          
          expect(status).toBe(400)
          checkErrorFormat(body)
        })
      })
    })

    describe('destructive testing', () => {
      // TODO
    })
  })

  describe('get product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {
        it('should return 200 HTTP status code in get all products', async () => {
          const temp = productFactory()
          await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get('/api/v1/product').set(TOKEN)
          expect(response.statusCode).toBe(200)
        })

        it('should return 200 HTTP status code in get one product', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get(`/api/v1/product/${body._id}`).set(TOKEN)
          expect(response.statusCode).toBe(200)
        })
      })

      describe('validate payload', () => {
        it('should return a list of products object with valid structure in get all products', async () => {
          const temp = productFactory()
          await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const { body, status } = await requestApp.get('/api/v1/product').set(TOKEN)
          
          expect(status).toBe(200)
          checkPaginateProductsFormat(body)
        })

        it('should return a list of products object with valid structure in get one product', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get(`/api/v1/product/${body._id}`).set(TOKEN)
          
          expect(response.status).toBe(200)
          checkProductFormat(response.body)
        })

        it('should return a list of products object with valid values in get one product', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get(`/api/v1/product/${body._id}`).set(TOKEN)
          
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productResponse,
            ...temp
          }))
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header in get all products', async () => {
          const temp = productFactory()
          await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get('/api/v1/product').set(TOKEN)
          
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })

        it('should return a valid content-type header in get one product', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.get(`/api/v1/product/${body._id}`).set(TOKEN)
          
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })

    describe('positive + optional parameters	', () => {
      describe('validate status code', () => {
        describe('should return 200 HTTP status code in get all products', () => {
          it('with page param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?page=1').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })
          it('with brand param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?brand=McCain').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })

          it('with department param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?department=Congelados').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })

          it('with page, brand and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?page=1&brand=McCain&department=Congelados').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })

          it('with page and brand params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?page=1&brand=McCain').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })

          it('with page and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?page=1&department=Congelados').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })

          it('with brand and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const response = await requestApp.get('/api/v1/product?brand=McCain&department=Congelados').set(TOKEN)
            expect(response.statusCode).toBe(200)
          })
        })
      })
      describe('validate payload', () => {
        describe('should return a list of products object with valid structure in get all products', () => {
          it('with page param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

            const { body, status } = await requestApp.get('/api/v1/product?page=1').set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with brand param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { brand } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?brand=${brand}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with department param', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { department } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?department=${department}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with page, brand and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { brand, department } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?page=1&brand=${brand}&department=${department}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with page and brand params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { brand } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?page=1&brand=${brand}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with page and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { department } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?page=1&department=${department}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
          })

          it('with brand and department params', async () => {
            const temp = productFactory()
            await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
            const { brand, department } = temp

            const { body, status } = await requestApp.get(`/api/v1/product?brand=${brand}&department=${department}`).set(TOKEN)
            expect(status).toBe(200)
            checkPaginateProductsFormat(body)
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
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductUpdate = {
            title: 'Anel de Cebola',
            description: 'Anel de Cebola Empanado pacote 1,05kg - McCain',
          }

          const response = await requestApp.patch(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.statusCode).toBe(200)
        })

        it('should return 200 HTTP status code in put method', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductCreate = productFactory()

          const response = await requestApp.put(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.statusCode).toBe(200)
        })
      })

      describe('validate payload', () => {
        it('should return a product object with valid structure in patch', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductUpdate = {
            title: 'Embalagem para Pizza',
            description: 'Embalagem para Pizza Oitavada 35cm Estampado pacote 25 unidades - São José',
          }

          const response = await requestApp.patch(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.status).toBe(200)
          checkProductFormat(response.body)
        })

        it('should return a product object with valid structure in put', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
          
          const product = productFactory()

          const response = await requestApp.put(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.status).toBe(200)
          checkProductFormat(response.body)
        })

        it('should return a product object with valid values in patch', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductUpdate = {
            title: 'Whisky',
            description: 'Whisky Escocês garrafa 1 Litro - White Horse',
          }

          const response = await requestApp.patch(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productResponse,
            ...product
          }))
        })

        it('should return a product object with valid values in put', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductCreate = {
            title: 'Beterraba',
            description: 'Beterraba  por kg - Dois Cunhados',
            department: 'Hortifruti',
            brand: 'Dois Cunhados',
            qtd_stock: 364,
            price: 8.99,
            bar_codes: '2484081116237'
          }

          const response = await requestApp.put(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.statusCode).toBe(200)
          expect(response.body).toEqual(expect.objectContaining({
            ...productResponse,
            ...product
          }))
        })
      })

      describe('validate headers', () => {
        it('should return a valid content-type header in response of patch method', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductUpdate = {
            title: 'Refrigerante',
            description: 'Refrigerante lata 350ml - Coca-Cola,Bebidas',
          }

          const response = await requestApp.patch(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })

        it('should return a valid content-type header in response of put method', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const product: IProductCreate = {
            title: 'Seleta de Legumes',
            description: 'Seleta de Legumes congelada pacote 1,02kg - Pratigel',
            department: 'Congelados',
            brand: 'Pratigel',
            qtd_stock: 1640,
            price: 9.36,
            bar_codes: '4835433821676'
          }

          const response = await requestApp.put(`/api/v1/product/${body._id}`).set(TOKEN).send(product)
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
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.delete(`/api/v1/product/${body._id}`).set(TOKEN)
          
          expect(response.statusCode).toBe(204)
        })
      })
      describe('validate status code', () => {
        it('should return empty body in response', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)

          const response = await requestApp.delete(`/api/v1/product/${body._id}`).set(TOKEN)
          
          expect(response.statusCode).toBe(204)
          expect(response.body).toEqual({})
        })
      })
      describe('validate headers', () => {
        it('should return a valid content-type header in response of patch method', async () => {
          const temp = productFactory()
          const { body } = await requestApp.post('/api/v1/product').set(TOKEN).send(temp)
        
          const response = await requestApp.delete(`/api/v1/product/${body._id}`).set(TOKEN)
          
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
