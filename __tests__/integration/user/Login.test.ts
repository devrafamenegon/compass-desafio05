import { requestApp } from "../../setup"
import { USER_ENDPOINT } from "../../utils/constants"
import userFactory from "../../utils/factories/UserFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"

describe('Feature: Login user', () => {
  const FEATURE_ENDPOINT = `${USER_ENDPOINT}/login`

  describe('Given user is not authenticated', () => {
    describe('When sends a valid credentials', () => {
      const user = userFactory()
      let response

      it('Then 200 is returned', async () => {
        await requestApp
          .post(USER_ENDPOINT)
          .send(user)

        response = await requestApp
          .post(FEATURE_ENDPOINT)
          .send(user)

        expect(response.status).toBe(200)
      })

      it('And body have user format', async () => {
        expect(response.body).toHaveProperty('token')
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends invalid credentials', () => {
      const user = userFactory()
      const invalidUser = {
        email: user.email,
        password: 'invalid',
      }
      let response

      it('Then 400 is returned', async () => {
        await requestApp
          .post(USER_ENDPOINT)
          .send(user)

        response = await requestApp
          .post(FEATURE_ENDPOINT)
          .send(invalidUser)

        expect(response.status).toBe(400)
      })

      it('And body have user format', async () => {
        checkErrorFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
  })
})