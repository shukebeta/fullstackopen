import React, {useState} from 'react'
import NewContactForm from "./components/NewContactForm"
import Contacts from "./components/Contacts"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456'},
    {name: 'Ada Lovelace', number: '39-44-5323523'},
    {name: 'Dan Abramov', number: '12-43-234345'},
    {name: 'Mary Poppendieck', number: '39-23-6423122'},
  ])

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
    if (!newName.trim() || !newNumber.trim()) return
    const newPersons = [...persons]
    newPersons.push({
      name: newName.trim(),
      number: newNumber.trim(),
    })
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
  }
  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setKeyword(evt.target.value)
  }
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
