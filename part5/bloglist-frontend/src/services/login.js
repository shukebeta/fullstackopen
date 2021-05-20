import axios from 'axios'
const baseUrl = '/api/login'

export const doLogin = async (loginForm) => {
  const response = await axios.post(baseUrl, loginForm)
  return response.data
}
