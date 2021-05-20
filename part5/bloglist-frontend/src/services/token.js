
const tokenKey = 'token'
export const getTokenFromStorage = () => {
  return window.localStorage.getItem(tokenKey) || ''
}

export const setTokenToStorage = (token) => {
  token = token || ''
  return window.localStorage.setItem(tokenKey, token)
}
