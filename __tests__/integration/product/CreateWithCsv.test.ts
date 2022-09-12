import { requestApp } from "../../setup"
import { PRODUCT_CSV_FILE, PRODUCT_ENDPOINT, TOKEN } from "../../utils/constants"
import { checkInsertManyProductsFormat } from "../../utils/formats/ProductFormat"

describe('Feature: Create product with csv', () => {
  const FEATURE_ENDPOINT = `${PRODUCT_ENDPOINT}/csv`

  describe('Given the user is authenticated', () => {
    describe('When sends a valid csv file', () => {
      let response

      it('Then 200 is returned', async () => {
        response = await requestApp
          .post(FEATURE_ENDPOINT)
          .set(TOKEN)
          .attach('file', PRODUCT_CSV_FILE)

        expect(response.status).toBe(200)
      })

      it('And body have product format', async () => {
        checkInsertManyProductsFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
  })
})