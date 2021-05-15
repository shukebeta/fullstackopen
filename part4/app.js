const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const blogsRouter = require('./controllers/blog')
app.use('/api/blogs', blogsRouter)

module.exports = app
