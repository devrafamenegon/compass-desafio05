import mongoose from 'mongoose'
import Database from '../src/infra/database/mongo/index'
import request from 'supertest'
import app from '../src/app'

global.beforeAll(async () => {
  await Database.connect()
  await Database.clear()
})

global.afterEach(async () => await Database.clear())

global.afterAll(async () => {
  await Database.clear()
  await Database.disconnect()
})

export const requestApp = request(app)
