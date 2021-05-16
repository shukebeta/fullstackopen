const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const expiresIn = 3600 * 2 // two hours
  const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
