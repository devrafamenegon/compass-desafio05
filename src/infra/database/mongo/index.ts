import mongoose from 'mongoose'
import config from '../../../config/config'

class Database {
  async connect (): Promise<typeof mongoose> {
    return await mongoose.connect(config.database.url as string)
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}

export default new Database()
