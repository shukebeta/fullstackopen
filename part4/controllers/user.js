const bcrypt = require('bcrypt')
const saltRounds = 10

const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const { ValidationError } = require('../Exceptions/ValidationError')

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body
  if (password.length < 3) {
    throw new ValidationError('password too short: it should be at least 3 chars long.')
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    name,
    username,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put('/:id', async (request, response) => {
  const { title, author, likes } = request.body
  const updatedUser = await User.findByIdAndUpdate(request.params.id, { title, author, likes })
  response.json(updatedUser)
})

usersRouter.patch('/liked/:id', async (request, response) => {
  const blogId = request.params.id
  if (request.user) {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
      $inc: {
        likes: 1,
      },
    })
    response.json(updatedBlog)
  } else {
    response.status(401).json({ message: 'Unauthorized' })
  }
})

module.exports = usersRouter
