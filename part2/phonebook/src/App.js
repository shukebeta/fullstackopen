import React, {useState, useEffect} from 'react'
import NewContactForm from "./components/NewContactForm"
import Contacts from "./components/Contacts"
import Filter from "./components/Filter"
import {getAll, create, update, remove} from './api/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const onNameChange = (evt) => {
    setNewName(evt.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const onNumberChange = (evt) => {
    setNewNumber(evt.target.value)
  }

  const onSubmitContact = (evt) => {
    evt.preventDefault()
    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return
    const existContact = persons.find(_ => _.name.toLowerCase() === name.toLowerCase())
    if (existContact !== null && window.confirm(`${existContact.name} is already added to phonebook,replace the old number with a new one?`)) {
      update(existContact.id, {...existContact, number}).then(updatedContact => {
        setPersons(persons.map(_ => _.id === existContact.id ? updatedContact : _))
        setNewName('')
        setNewNumber('')
      })
    } else {
      create({
        name, number,
      }).then(newContact => {
        setPersons([...persons, newContact])
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setKeyword(evt.target.value)
  }
  const onRemoveClick = (id) => {
    const contact = persons.find(_ => _.id === id)
    if (contact !== null && window.confirm(`Delete ${contact.name}?`)) {
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

      <Filter keyword={keyword} onKeywordInput={onKeywordInput}/>
      <h3>Add a new</h3>
      <NewContactForm values={{newName, newNumber}} events={{onNameChange, onNumberChange, onSubmitContact}}/>
      <h3>Numbers</h3>
      <Contacts persons={persons} keyword={keyword} onRemoveClick={onRemoveClick}/>
    </div>
  )
}

export default App
