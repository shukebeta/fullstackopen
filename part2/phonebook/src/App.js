import React, {useState, useEffect} from 'react'
import NewContactForm from "./components/NewContactForm"
import Contacts from "./components/Contacts"
import Filter from "./components/Filter"
import {getAll, create, update, remove} from './api/persons'
import {ErrorMessage, SuccessMessage} from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [newName, setNewName] = useState('')
  const onNameChange = (evt) => {
    setNewName(evt.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const onNumberChange = (evt) => {
    setNewNumber(evt.target.value)
  }

  const onSubmitContact = async (evt) => {
    evt.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return
    const existContact = persons.find(_ => _.name.toLowerCase() === name.toLowerCase())
    if (existContact !== undefined && window.confirm(`${existContact.name} is already added to phonebook,replace the old number with a new one?`)) {
      try {
        const updatedContact = await update(existContact.id, {...existContact, number})
        setPersons(persons.map(_ => _.id === existContact.id ? updatedContact : _))
        setNewName('')
        setNewNumber('')
      } catch (e) {
        setErrorMessage(e.response.data.error)
        setTimeout(() => setErrorMessage(''), 3000)
      }
    } else {
      create({
        name, number,
      }).then(newContact => {
        setPersons([...persons, newContact])
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${name}`)
        setTimeout(() => setSuccessMessage(''), 3000)
      })
    }
  }

  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setKeyword(evt.target.value)
  }
  const onRemoveClick = (id) => {
    const contact = persons.find(_ => _.id === id)
    if (contact !== undefined && window.confirm(`Delete ${contact.name}?`)) {
      remove(id).then(() => {
        setPersons(persons.filter(_ => _.id !== id))
      })
    }
  }

  useEffect(() => {
    getAll()
      .then(_ => {
        setPersons(_)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage}/>
      <SuccessMessage message={successMessage}/>
      <Filter keyword={keyword} onKeywordInput={onKeywordInput}/>
      <h3>Add a new</h3>
      <NewContactForm values={{newName, newNumber}} events={{onNameChange, onNumberChange, onSubmitContact}}/>
      <h3>Numbers</h3>
      <Contacts persons={persons} keyword={keyword} onRemoveClick={onRemoveClick}/>
    </div>
  )
}

export default App
