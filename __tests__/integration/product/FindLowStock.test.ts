import { requestApp } from "../../setup"
import { PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import productFactory from "../../utils/factories/ProductFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkPaginateProductsFormat } from "../../utils/formats/ProductFormat"

describe('Feature: Find Low Stock products', () => {
  const FEATURE_ENDPOINT = `${PRODUCT_ENDPOINT}/low_stock`
  describe('Given the user is authenticated', () => {
    describe('When sends a valid request', () => {
      const product = productFactory()
      product.qtd_stock = 10

      let response

      it('Then 200 is returned', async () => {
        await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

        response = await requestApp
          .get(FEATURE_ENDPOINT)
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