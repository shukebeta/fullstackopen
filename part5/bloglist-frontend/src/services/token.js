
const tokenKey = 'token'
export const getTokenFromStorage = () => {
  return window.localStorage.getItem(tokenKey) || ''
}

export const setTokenToStorage = (token) => {
  token = token || ''
  return window.localStorage.setItem(tokenKey, token)
}

const userIdKey = 'userId'
export const getUserIdFromStorage = () => {
  return window.localStorage.getItem(userIdKey) || ''
}

export const setUserIdToStorage = (userId) => {
  userId = userId || ''
  return window.localStorage.setItem(userIdKey, userId)
}
