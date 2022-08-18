import { Types } from 'mongoose'

export interface IProduct {
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
  created_at?: Date
  updated_at?: Date
  __v?: number
}
