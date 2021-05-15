const bcrypt = require('bcrypt')
const saltRounds = 10

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body
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
  const users = await User.find({})
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

module.exports = usersRouter
