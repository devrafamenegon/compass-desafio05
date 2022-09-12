import UserSchema from '../schemas/UserSchema'
import { IUser, IUserRegister, IUserResponse } from '../interfaces/IUser'

class UserRepository {
  async register (payload: IUserRegister): Promise<IUserResponse> {
    return await UserSchema.create(payload)
  }

  async findOne (id: string): Promise<IUser | null> {
    return await UserSchema.findById(id).select('+password')
  }

  async findAll (): Promise<IUserResponse[]> {
    return await UserSchema.find()
  }

  async findOneByEmail (email: string): Promise<IUser | null> {
    return await UserSchema.findOne({ email }).select('+password')
  }
}

export default new UserRepository()
