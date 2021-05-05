import React from 'react'
import {nanoid} from 'nanoid'

const CountryInfo = ({data}) => {
  if (data === null) {
    return ''
  }
  return (
    <>
      <h2>{data.name}</h2>
      <p>
        capital {data.capital}<br/>
        population {data.population}
      </p>
      <h3>languages</h3>
      <ul className="language">
        {data.languages.map(_ => <li key={nanoid()}>{_.name}</li>)}
      </ul>
      <p><img alt={`${data.name}'s flag`} className="flag" src={data.flag} /></p>
    </>
  )
}

export default CountryInfo
