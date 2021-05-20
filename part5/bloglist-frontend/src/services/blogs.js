import axios from 'axios'
import {getTokenFromStorage} from "./token"
const baseUrl = '/api/blogs'

export const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      'Authorization': `Bearer ${getTokenFromStorage()}`
    }
  })
  return response.data
}

export const add = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      'Authorization': `Bearer ${getTokenFromStorage()}`
    }
  })
  return response.data
}

export const remove = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, {
    headers: {
      'Authorization': `Bearer ${getTokenFromStorage()}`
    }
  })
}
