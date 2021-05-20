import React from 'react'
import PropTypes from 'prop-types'
export const ErrorMessage = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export const SuccessMessage = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}
SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired
}
