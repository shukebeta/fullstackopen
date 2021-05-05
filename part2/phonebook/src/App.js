import React, {useState, useEffect} from 'react'
import NewContactForm from "./components/NewContactForm"
import Contacts from "./components/Contacts"
import Filter from "./components/Filter"
import {getAll, create, update} from './api/persons'

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
    create({
      name, number
    }).then(newContact => {
      setPersons([...persons, newContact])
      setNewName('')
      setNewNumber('')
    })
  }

  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setKeyword(evt.target.value)
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
      <Contacts persons={persons} keyword={keyword}/>
    </div>
  )
}

export default App
