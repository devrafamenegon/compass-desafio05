import { requestApp } from "../../setup"
import { PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import productFactory from "../../utils/factories/ProductFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkProductFormat } from "../../utils/formats/ProductFormat"

describe('Feature: Patch product', () => {
  describe('Given the user is authenticated', () => {
    describe('When sends a existent product ID', () => {
      const product = productFactory()
      const newProduct = productFactory()
      let response

      it('Then 200 is returned', async () => {
        const { body } = await requestApp
          .post(PRODUCT_ENDPOINT)
          .set(TOKEN)
          .send(product)

        response = await requestApp
          .patch(`${PRODUCT_ENDPOINT}/${body._id}`)
          .set(TOKEN)
          .send(newProduct)

        expect(response.status).toBe(200)
      })

      it('And body have product format', async () => {
        checkProductFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends a non-existent product ID', () => {
      const newProduct = productFactory()
      let response

      it('Then 404 is returned', async () => {
        response = await requestApp
          .patch(`${PRODUCT_ENDPOINT}/4585be6d-80bc-4cd3-9d23-20c54bf075ea`)
          .set(TOKEN)
          .send(newProduct)

        expect(response.status).toBe(404)
      })

      it('And body have error format', async () => {
        checkErrorFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends a invalid product ID', () => {
      const newProduct = productFactory()
      let response

      it('Then 400 is returned', async () => {
        response = await requestApp
          .patch(`${PRODUCT_ENDPOINT}/123456`)
          .set(TOKEN)
          .send(newProduct)

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