import { IUserResponse } from "../../../src/api/interfaces/IUser"

export const userResponse: IUserResponse = {
  _id: expect.any(String),
  email: expect.any(String),
  created_at: expect.any(String),
  updated_at: expect.any(String),
  __v: expect.any(Number)
}

export const checkUserFormat = (body) => {
  expect(body).toEqual(userResponse)
}
