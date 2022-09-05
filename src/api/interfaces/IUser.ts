export interface IUser {
  _id?: string
  email: string
  password: string
}

export interface IUserResponse {
  _id: string
  email: string
  created_at?: Date
  updated_at?: Date
  __v?: number
}

export interface IUserCreate {
  email: string
  password: string
}