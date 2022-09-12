import { requestApp } from "../../setup"
import { PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import productFactory from "../../utils/factories/ProductFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkPaginateProductsFormat } from "../../utils/formats/ProductFormat"

describe('Feature: Find all products', () => {
  describe('Given the user is authenticated', () => {
    describe('When sends a request without parameters', () => {
      const product = productFactory()
      let response

      it('Then 200 is returned', async () => {
        await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

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
  })
})