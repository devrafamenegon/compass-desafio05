import app from './app'
import Logger from './api/utils/logger'

app.listen(process.env.PORT ?? 3000, () => {
  Logger.info(`App starting at http://localhost:${process.env.PORT ?? 3000}`)
  Logger.info(`Envs: ${process.env.TARGET ?? 'local'}`)
})
