import ProductSchema from '../src/api/schemas/ProductSchema'
import Database from '../src/infra/database/mongo/index'


global.beforeAll(async () => {
  await Database.connect();
  await ProductSchema.deleteMany({})
})

global.afterAll(async () => {
  await ProductSchema.deleteMany({})
  await Database.disconnect();
});