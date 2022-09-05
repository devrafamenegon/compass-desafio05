import UserRepository from "../repositories/UserRepository"
import { IUserCreate, IUserResponse } from "../interfaces/IUser"

class UserService {
  async create (payload: IUserCreate): Promise<IUserResponse> {
    const result = await UserRepository.create(payload)
    return result
  }

  async findOne (id: string): Promise<IUserResponse | null> {
    return await UserRepository.findOne(id)
  }
}

export default new UserService()
