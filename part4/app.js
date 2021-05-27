const express = require('express')
require('express-async-errors')
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const { isTestEnv } = require('./config')

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (isTestEnv) {
  app.use('/api/testing', require('./controllers/testing'))
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
