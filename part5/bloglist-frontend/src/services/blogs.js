import axios from 'axios'
const baseUrl = '/api/blogs'

export const getAll = async (token) => {
  const response = await axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

export const add = async (newBlog, token) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}
