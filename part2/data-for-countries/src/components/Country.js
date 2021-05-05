import React from 'react'

const Country = ({name, onCountryClick}) => (
  <li>{name} <button type="button" onClick={() => onCountryClick(name)}>show</button></li>
)

export default Country
