import mongoose from 'mongoose'
import supertest from 'supertest'
import { IProductCreate } from '../../src/app/interfaces/IProduct'
import ProductSchema from '../../src/app/schema/ProductSchema'
import server from '../../src/server'

const appTest = supertest(server)

const productReturn = {
  _id: expect.any(String),
  title: expect.any(String),
  description: expect.any(String), 
  department: expect.any(String),
  brand: expect.any(String), 
  price: expect.any(Number),
  qtd_stock: expect.any(Number), 
  stock_control_enabled: expect.any(Boolean),
  bar_codes: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  __v: expect.any(Number)
}

let productId: string

describe('Product', () => {
  beforeAll(async () => {
    await ProductSchema.deleteMany({})
  })
  
  afterAll(async () => {
    await ProductSchema.deleteMany({})
    server.close()
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('create product', () => {
    describe('basic positive tests', () => {
      describe('validate status code', () => {

      })

      describe('validate payload', () => {
      
      })
      describe('validate headers', () => {

      })
    })

    describe('positive + optional parameters', () => {
      
    })

    describe('negative testing – valid input', () => {
      describe('validate status code', () => {
        
      })
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('get product', () => {
    describe('basic positive tests', () => {
      
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('update product', () => {
    describe('basic positive tests', () => {
      
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })

  describe('delete product', () => {
    describe('basic positive tests', () => {
      
    })

    describe('positive + optional parameters	', () => {
      
    })

    describe('negative testing – valid input', () => {
      
    })

    describe('negative testing – invalid input', () => {

    })

    describe('destructive testing', () => {
      
    })
  })
})
