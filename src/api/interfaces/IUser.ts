export interface IUser {
  _id: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

export interface IUserResponse {
  _id: string
  email: string
  created_at: Date
  updated_at: Date
}

export interface IUserRegister {
  email: string
  password: string
}

export interface IUserLogin {
  email: string
  password: string
}