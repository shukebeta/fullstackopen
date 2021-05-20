const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  if (request.user) {
    const user = await User.findById(request.user)
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    })
    const savedBlog = await blog.save()
    user.blogs.push(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(401).json({ message: 'Unauthorized' })
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (blog === null) {
    response.status(404).end()
  }
  if (request.user && request.user.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } else {
    response.status(401).json({ message: 'Unauthorized' })
  }
})

blogsRouter.delete('/', async(request, response) => {
  if (request.user) {
    const user = await User.findById(request.user)
    if (user && user.username === 'root') {
      await Blog.deleteMany({})
      response.status('200').json({ message: 'all blogs are deleted successfully.' })
    }
  }
  response.status(401).json({ message: 'Unauthorized' })
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if (blog === null) {
    response.status(404).end()
  }
  if (request.user && request.user.toString() === blog.user.toString()) {
    const { title, author, likes } = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, likes })
    response.json(updatedBlog)
  } else {
    response.status(401).json({ message: 'Unauthorized' })
  }
})

module.exports = blogsRouter
