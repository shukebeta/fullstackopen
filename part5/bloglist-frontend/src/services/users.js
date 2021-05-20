import axios from 'axios'
import {getTokenFromStorage} from "./token"
const baseUrl = '/api/users'

export const like = async (blogId) => {
  const response = await axios.patch(`${baseUrl}/liked/${blogId}`, null, {
    headers: {
      'Authorization': `Bearer ${getTokenFromStorage()}`
    }
  })
  return response.data
}

