const logger = require('../utils/logger')
const config = require('../config')

const mongoose = require('mongoose')
mongoose.set('returnOriginal', false)
mongoose.Promise = Promise
mongoose.connection.on(
  'connected', () => {
    console.log('Connection Established')
  },
  'reconnected', () => {
    console.log('Connection Reestablished')
  },
  'disconnected', () => {
    console.log('Connection Disconnected')
  },
  'close', () => {
    console.log('Connection Closed')
  },
  'error', (error) => {
    console.log('ERROR: ' + error)
  },
)
logger.info('connecting to', config.MONGODB_URI)
const run = async () => {
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}
run().catch(error => console.error(error))
module.exports = mongoose
