import { requestApp } from "../../setup"
import { PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import productFactory from "../../utils/factories/ProductFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkProductFormat } from "../../utils/formats/ProductFormat"

describe('Feature: Create product', () => {
  describe('Given the user is authenticated', () => {
    describe('When sends a valid product', () => {
      const product = productFactory()
      let response

      it('Then 201 is returned', async () => {
        response = await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

        expect(response.status).toBe(201)
      })

      it('And body have product format', async () => {
        checkProductFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends a duplicated product', () => {
      const product = productFactory()
      let response

      it('Then 400 is returned', async () => {
        await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

        response = await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

        expect(response.status).toBe(400)
      })

      it('And body have error format', async () => {
        checkErrorFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends an incomplete product', () => {
      describe('And title is missing', () => {
        const temp = productFactory()
        const product = {
          description: temp.description, 
          department: temp.department,
          brand: temp.brand,
          price: temp.price,
          qtd_stock: temp.qtd_stock, 
          bar_codes: temp.bar_codes,
        }
        let response

        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And description is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          department: temp.department,
          brand: temp.brand,
          price: temp.price,
          qtd_stock: temp.qtd_stock, 
          bar_codes: temp.bar_codes,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And department is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          description: temp.description,
          brand: temp.brand,
          price: temp.price,
          qtd_stock: temp.qtd_stock, 
          bar_codes: temp.bar_codes,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And brand is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          description: temp.description,
          department: temp.department,
          price: temp.price,
          qtd_stock: temp.qtd_stock, 
          bar_codes: temp.bar_codes,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And price is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          description: temp.description,
          department: temp.department,
          brand: temp.brand,
          qtd_stock: temp.qtd_stock, 
          bar_codes: temp.bar_codes,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And qtd_stock is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          description: temp.description,
          department: temp.department,
          brand: temp.brand,
          price: temp.price,
          bar_codes: temp.bar_codes,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And bar_codes is missing', () => {
        const temp = productFactory()
        const product = {
          title: temp.title,
          description: temp.description,
          department: temp.department,
          brand: temp.brand,
          price: temp.price,
          qtd_stock: temp.qtd_stock,
        }
        let response
  
        it('Then 400 is returned', async () => {
          await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          response = await requestApp
            .post(PRODUCT_ENDPOINT)
            .set(TOKEN)
            .send(product)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })
  })
})