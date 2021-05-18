const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const morgan = require('morgan')
morgan.token('post-data', (req) => req.method === 'POST' || req.method === 'PUT' ? JSON.stringify(req.body) : '')
const requestLogger = morgan(':method :url :status :response-time :post-data')

const tokenExtractor = (request, response, next) => {
  const authHeader = request.headers.authorization
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    request.token = authHeader.substring(7)
  }
  next()
}

const verifyTokenAndGetUid = token => {
  const decodedToken = jwt.verify(token, JWT_SECRET)
  if (!token || !decodedToken.id) {
    return null
  }
  return decodedToken.id
}

const userExtractor = (request, response, next) => {
  if (request.token) {
    request.user = verifyTokenAndGetUid(request.token)
  }
  next()
}

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// error handling middleware has to be the last loaded middleware!!!
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: `malFormatted id: ${error.value}` })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `${error.message}` })
  }
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  requestLogger,
}
