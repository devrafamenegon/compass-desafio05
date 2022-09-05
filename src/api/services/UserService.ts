import UserRepository from "../repositories/UserRepository"
import { IUserCreate, IUserResponse } from "../interfaces/IUser"

class UserService {
  async create (payload: IUserCreate): Promise<IUserResponse> {
    const result = await UserRepository.create(payload)
    return result
  }
}

export default new UserService()
