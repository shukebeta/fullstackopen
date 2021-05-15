
const logger = require('./logger')

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

module.exports = { unknownEndpoint, errorHandler, }
