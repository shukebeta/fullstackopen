import axios from 'axios'
const baseUrl = '/api/persons'

export const getAll = () => {
  return axios.get(baseUrl).then(_ => _.data)
}

export const create = person => {
  return axios.post(baseUrl, person).then(_ => _.data)
}

export const update = (id, person) => {
  return axios.put(`${baseUrl}/${id}`, person).then(_ => _.data)
}

export const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

