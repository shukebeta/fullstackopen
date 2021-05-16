require('dotenv').config()

const isTestEnv = process.env.NODE_ENV === 'test'
const envPrefix = isTestEnv ? 'TEST_' : ''
const mongoDbConfigName = `${envPrefix}MONGO_CONNECTION_STRING`

const PORT = process.env.PORT
const MONGODB_URI = process.env[mongoDbConfigName]
const JWT_SECRET = process.env.SECRET

module.exports = {
  isTestEnv,
  MONGODB_URI,
  PORT,
  JWT_SECRET,
}
