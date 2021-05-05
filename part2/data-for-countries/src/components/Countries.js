import React from 'react'
import Country from "./Country"
import {nanoid} from 'nanoid'
import CountryInfo from "./CountryInfo"

const Countries = ({countries, shownCountry, keyword, onCountryClick}) => {
  const key = keyword.trim().toLowerCase()
  if (key) {
    let targetCountries = [...countries]
    targetCountries = targetCountries.filter(_ => _.name.toLowerCase().includes(key))
    const count = targetCountries.length
    if (count > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (count === 1) {
      return <CountryInfo data={targetCountries[0]}/>
    }
    return (
      <>
        <ul>
          {
            targetCountries.map((_) => <Country name={_.name} onCountryClick={onCountryClick} key={nanoid()}/>)
          }
        </ul>
        <CountryInfo data={shownCountry}/>
      </>
    )
  } else {
    return ''
  }
}

export default Countries
