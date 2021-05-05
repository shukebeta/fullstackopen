import React from 'react'

const Contact = ({person, onRemoveClick}) => (
  <li>{person.name} {person.number}<button type="button" onClick={() => onRemoveClick(person.id)}>delete</button></li>
)

export default Contact
