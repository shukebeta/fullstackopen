import React from 'react'
import Contact from "./Contact";
import {nanoid} from 'nanoid'

const Contacts = ({persons, keyword}) => {
  const key = keyword.trim().toLowerCase()
  let contacts = [...persons]
  if (key) {
    contacts = contacts.filter(_ => _.name.toLowerCase().includes(key) || _.number.toLowerCase().includes(key))
  }
  return (
    <div>
      {
        contacts.map((_) => <Contact name={_.name} number={_.number} key={nanoid()} />)
      }
    </div>
  )
}

export default Contacts
