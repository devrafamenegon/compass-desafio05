import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class Database {
  constructor () {
    void this.connect()
  }

  async connect (): Promise<typeof mongoose> {
    return await mongoose.connect(
      process.env.MONGO_DB_URL ?? 'mongodb://localhost:27017/compassMart'
    )
  }
}

export default new Database().connect()
