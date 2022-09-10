import mongoose from 'mongoose'
import Database from '../src/infra/database/mongo/index'
import { request } from 'supertest'
import app from '../src/app'

async function cleanDB() {
  const collecttions = Object.keys(mongoose.connection.collections);
  await Promise.all(
    collecttions.map(async (collection) => {
      await mongoose.connection.collections[collection].deleteMany({});
    })
  );
}

global.beforeAll(async () => {
  await Database.connect()
  await cleanDB()
})

global.afterEach(async () => await cleanDB())

global.afterAll(async () => {
  await cleanDB()
  await Database.disconnect()
});

export const appTest = request(app)
