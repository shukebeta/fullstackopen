const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const logger = require('../utils/logger')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'be ta',
    likes: 3,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'be ta',
    likes: 3,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const promiseAll = initialBlogs.map(_ => (new Blog(_)).save())
  await Promise.all(promiseAll)
})

describe('test blogs api', () => {
  test('blogs are returned as json array with length: 2', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/i)
    expect(response.body).toHaveLength(2)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
