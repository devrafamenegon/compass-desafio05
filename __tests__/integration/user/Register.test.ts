import { requestApp } from "../../setup"
import { TOKEN, USER_ENDPOINT } from "../../utils/constants"
import userFactory from "../../utils/factories/UserFactory"
import { checkErrorFormat } from "../../utils/formats/ErrorFormat"
import { checkUserFormat } from "../../utils/formats/UserFormat"

describe('Feature: Register user', () => {
  describe('Given [...]', () => {
    describe('When sends a valid credentials', () => {
      const user = userFactory()
      let response

      it('Then 201 is returned', async () => {
        response = await requestApp
          .post(USER_ENDPOINT)
          .set(TOKEN)
          .send(user)

        expect(response.status).toBe(201)
      })

      it('And body have user format', async () => {
        checkUserFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends a duplicated email', () => {
      const user = userFactory()
      let response

      it('Then 400 is returned', async () => {
        await requestApp
          .post(USER_ENDPOINT)
          .send(user)

        response = await requestApp
          .post(USER_ENDPOINT)
          .send(user)

        expect(response.status).toBe(400)
      })

      it('And body have error format', async () => {
        checkErrorFormat(response.body)
      })
      it('And header content type is application/json', async () => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
      })
    })
    describe('When sends an incomplete user', () => {
      describe('And email is missing', () => {
        const temp = userFactory()
        const user = {
          password: temp.password,
        }
        let response

        it('Then 400 is returned', async () => {
          await requestApp
            .post(USER_ENDPOINT)
            .send(user)
  
          response = await requestApp
            .post(USER_ENDPOINT)
            .send(user)
  
          expect(response.status).toBe(400)
        })
  
        it('And body have error format', async () => {
          checkErrorFormat(response.body)
        })
        it('And header content type is application/json', async () => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
        })
      })
      describe('And password is missing', () => {
        const temp = userFactory()
        const user = {
          email: temp.email,
        }
        let response

        it('Then 400 is returned', async () => {
          await requestApp
            .post(USER_ENDPOINT)
            .send(user)
  
          response = await requestApp
            .post(USER_ENDPOINT)
            .send(user)
  
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