import UserSchema from '../schemas/UserSchema'
import { IUser, IUserCreate, IUserResponse } from '../interfaces/IUser'

class UserRepository {
  async create (payload: IUserCreate): Promise<IUserResponse> {
    return await UserSchema.create(payload)
  }

  async findOne (id: string): Promise<IUserResponse | null> {
    return await UserSchema.findById(id).select('+password')
  }

  async findOneByEmail (email: string): Promise<IUser | null> {
    return await UserSchema.findOne({ email }).select('+password')
  }
}

export default new UserRepository()
