const express = require('express')
require('express-async-errors')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
app.use('/api/blogs', blogsRouter)

// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

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
app.use(errorHandler)

module.exports = app
