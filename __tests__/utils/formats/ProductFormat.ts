import { IProductResponse } from "../../../src/api/interfaces/IProduct"

export const productResponse: IProductResponse = {
  _id: expect.any(String),
  title: expect.any(String),
  description: expect.any(String), 
  department: expect.any(String),
  brand: expect.any(String),
  price: expect.any(Number),
  qtd_stock: expect.any(Number), 
  stock_control_enabled: expect.any(Boolean),
  bar_codes: expect.any(String),
  created_at: expect.any(String),
  updated_at: expect.any(String),
}

export const paginateProductsResponse = {
  limit: expect.any(Number),
  offset: expect.any(Number),
  offsets: expect.any(Number),
  total: expect.any(Number),
  products: expect.arrayContaining([
    expect.objectContaining(productResponse)
  ])
}

export const checkProductFormat = (body) => {
  expect(body).toEqual(productResponse)
}

export const checkPaginateProductsFormat = (body) => {
  expect(body).toEqual(expect.objectContaining(paginateProductsResponse))
}
