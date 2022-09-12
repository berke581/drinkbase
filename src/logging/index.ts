import winston, { format } from 'winston'
const { combine, timestamp, colorize, printf } = format

function isDevelopment() {
  const env = process.env.NODE_ENV
  return env === 'development'
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const levelColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

const getLevel = () => {
  return isDevelopment() ? 'debug' : 'warn'
}

winston.addColors(levelColors)

const shouldColorize = isDevelopment()
const formatLogs = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  colorize({ level: shouldColorize }),
  printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new winston.transports.File({ filename: 'logs/combined.log' }),
]

const logger = winston.createLogger({
  level: getLevel(),
  levels,
  format: formatLogs,
  transports,
})

export default logger
