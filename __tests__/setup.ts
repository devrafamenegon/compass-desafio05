import Database from '../src/infra/database/mongo/index'
import request from 'supertest'
import app from '../src/app'

jest.setTimeout(100000)

global.beforeAll(async () => {
  await Database.connect()
  await Database.clear()
})

global.afterAll(async () => {
  await Database.disconnect()
})

export const requestApp = request(app)
