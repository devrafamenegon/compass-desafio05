import express from 'express'
import routes from './routes/index.router'
import Database from './infra/database/mongo/index'
import handleError from './api/middlewares/errorHandler'
import morganMiddleware from './config/logger'

Database.connect()

class App {
  public server: express.Application

  public constructor () {
    this.server = express()
    this.middlewares()
    this.routes()
  }

  public init (): express.Application {
    return this.server
  }

  private middlewares (): void {
    this.server.use(express.json({}))
    this.server.use(express.urlencoded({ extended: true }))
    this.server.use(morganMiddleware)
  }

  private routes (): void {
    this.server.use('/api/v1', ...routes)
    this.server.use(handleError)
  }
}

export default new App().init()
