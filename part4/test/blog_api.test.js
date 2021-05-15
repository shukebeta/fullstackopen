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

describe('testing get blogs api...', () => {
  test('get blogs: blogs are returned as json array with length: 2', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/i)
    expect(response.body).toHaveLength(2)
  })

  test('get blogs: id property is named', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('testing new blog api...', () => {
  test('new blog: created ok', async () => {
    const blog = {
      title: 'new test',
      author: 'new test',
      url: 'https://stackoverflow.com',
    }
    const response = await api.post('/api/blogs').send(blog).expect(201)
    expect(response.body.url).toBe(blog.url)
  })

  test('new blog: likes has a default value 0', async () => {
    const blog = {
      title: 'new test',
      author: 'new test',
      url: 'https://stackoverflow.com',
    }
    const response = await api.post('/api/blogs').send(blog).expect(201)
    console.log(response.body)
    expect(response.body.likes).toEqual(0)
  })

  test('new blog: title and url are required', async () => {
    const blog = {
      title: 'new test',
      author: 'new test',
      url: 'https://google.com',
    }
    await api.post('/api/blogs').send({ title: blog.title }).expect(400)
    await api.post('/api/blogs').send({ url: blog.url }).expect(400)
  })
})

describe('testing delete a blog api...', () => {
  test('delete blog: delete by id', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/i)
    const id = response.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
  })
})

describe('testing put blog api...', () => {
  test('put blog: likes + 1 ok', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = (await api.put(`/api/blogs/${newBlog.id}`).send(newBlog)).body
    expect(updatedBlog.likes).toEqual(blog.likes + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
