import { Date } from 'mongoose'

export interface IProduct {
  _id?: string
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
  _id: string
  title: string
  description: string
  department: string
  brand: string
  price: number
  qtd_stock: number
  stock_control_enabled: boolean
  bar_codes: string
  created_at?: Date
  updated_at?: Date
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
  error: string | string[]
}

export interface IProductCreateWithCsvResponse {
  success: number
  errors: number
  errors_details: IErrorsDetails[]
}
