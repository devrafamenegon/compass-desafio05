import { requestApp } from "../../setup"
import { PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import productFactory from "../../utils/factories/ProductFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkPaginateProductsFormat } from "../../utils/formats/ProductFormat"

let global_product 
beforeEach((async () => {
  for (let i = 0; i < 10; i++) {
    global_product = await requestApp
      .post(PRODUCT_ENDPOINT)
      .set(TOKEN)
      .send(productFactory())
  }
}))

describe('Feature: Find all products', () => {
  describe('Given the user is authenticated', () => {
    describe('When sends a request without parameters', () => {
      let response

      it('Then 200 is returned', async () => {
        response = await requestApp
          .get(PRODUCT_ENDPOINT)
          .set(TOKEN)

        expect(response.status).toBe(200)
      })

      it('And body have product paginate format', async () => {
        checkPaginateProductsFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })

    describe('When sends a request with parameters', () => {
      describe('And the parameter is page', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?page=1`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is brand', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?brand=${global_product.brand}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is department', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?brand=${global_product.department}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is page and brand', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?page=1&brand=${global_product.brand}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is page and department', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?page=1&department=${global_product.department}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is page, brand and department', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?page=1&brand=${global_product.brand}&department=${global_product.department}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is brand and department', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?brand=${global_product.brand}&department=${global_product.department}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And the parameter is brand and department', () => {
        let response

        it('Then 200 is returned', async () => {
          response = await requestApp
            .get(`${PRODUCT_ENDPOINT}?brand=${global_product.brand}&department=${global_product.department}`)
            .set(TOKEN)

          expect(response.status).toBe(200)
        })

        it('And body have product paginate format', async () => {
          checkPaginateProductsFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
    })
  })
})