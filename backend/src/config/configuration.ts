export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/servicemanager'
  },
  loggingLevel: parseLoggingLevel(),
  logFile: process.env.LOG_FILE || 'logs\\server.log',
  logErrFile: process.env.LOG_ERROR_FILE || 'logs\\errors.log'
})

const parseLoggingLevel = () => {
  const validLoggingLevels = [ 'error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly' ]
  return validLoggingLevels.includes(process.env.LOG_LEVEL) ? process.env.LOG_LEVEL : 'info'
}
