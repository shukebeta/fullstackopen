const { isTestEnv } = require('../config')
const info = (...params) => {
  if (!isTestEnv)
    console.log(...params)
}

const error = (...params) => {
  if (!isTestEnv)
    console.error(...params)
}

module.exports = {
  info, error,
}
