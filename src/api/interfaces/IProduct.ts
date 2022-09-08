import { Date, Types } from 'mongoose'

export interface IProduct {
  _id?: Types.ObjectId
  title: string
  description: string
  department: string
  brand: string
  price: number
  qtd_stock: number
  stock_control_enabled: boolean
  bar_codes: string
}

export interface IProductResponse {
  _id: Types.ObjectId
  title: string
  description: string
  department: string
  brand: string
  price: number
  qtd_stock: number
  stock_control_enabled: boolean
  bar_codes: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export interface IProductCreate {
  title: string
  description: string
  department: string
  brand: string
  price: number
  qtd_stock: number
  stock_control_enabled?: boolean
  bar_codes: string
}

export interface IProductUpdate {
  title?: string
  description?: string
  department?: string
  brand?: string
  pricd?: number
  qtd_stock?: number
  stock_control_enabled?: boolean
  bar_codes?: string
}

export interface IProductQuery {
  department?: string
  brand?: string
  page?: number
}

export interface IErrorsDetails {
  title: string
  bar_codes: string
  error: string | Array<string>
}

export interface IProductCreateWithCsvResponse {
  success: number
  errors: number
  errors_details: IErrorsDetails[]
}
