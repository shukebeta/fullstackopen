const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'be ta',
    url: 'https://google.com',
    likes: 3,
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'be ta',
    url: 'https://google.com',
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
  test('id property is named', async () => {
    const response = await api.post('/api/blogs').send({
      title: 'new test',
      author: 'new test',
      url: 'https://stackoverflow.com',
    }).expect(201)
    expect(response.body.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
