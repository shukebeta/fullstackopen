import React from 'react'

const NewContactForm = ({values, events}) => {
  return (
    <form onSubmit={events.onSubmitContact}>
      <div>name: <input value={values.newName} onChange={events.onNameChange}/></div>
      <div>number: <input value={values.newNumber} onChange={events.onNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default NewContactForm
