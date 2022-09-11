import mongoose from 'mongoose'
import config from '../../../config/config'

class Database {
  async connect (): Promise<typeof mongoose> {
    return await mongoose.connect(config.database.url as string)
  }

  async disconnect() {
    await mongoose.connection.close();
  }
  
  async clear() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}

export default new Database()
