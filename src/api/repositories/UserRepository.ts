import UserSchema from '../schemas/UserSchema'
import { IUserCreate, IUserResponse } from '../interfaces/IUser'

class UserRepository {
  async create (payload: IUserCreate): Promise<IUserResponse> {
    return await UserSchema.create(payload)
  }
}

export default new UserRepository()
