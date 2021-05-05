import React from 'react'
import Contact from "./Contact";
import {nanoid} from 'nanoid'

const Contacts = ({persons, keyword, onRemoveClick}) => {
  const key = keyword.trim().toLowerCase()
  let contacts = [...persons]
  if (key) {
    contacts = contacts.filter(_ => _.name.toLowerCase().includes(key) || _.number.toLowerCase().includes(key))
  }
  return (
    <div>
      {
        contacts.map((_) => <Contact person={_} onRemoveClick={onRemoveClick} key={nanoid()} />)
      }
    </div>
  )
}

export default Contacts
