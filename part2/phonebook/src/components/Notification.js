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
