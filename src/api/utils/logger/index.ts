/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { format, createLogger, transports } from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = (): string => {
  const env = process.env.NODE_ENV ?? 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)

const customTransports = [
  new transports.Console(),
  new transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new transports.File({
    filename: 'logs/all.log'
  })
]

const Logger = createLogger({
  level: level(),
  levels,
  format: customFormat,
  transports: customTransports
})

export default Logger
