const mongoose = require('mongoose')
mongoose.set('returnOriginal', false)
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'not set',
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
