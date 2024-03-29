import React, {useState, useEffect} from 'react'
import Countries from "./components/Countries"
import Filter from "./components/Filter"
import './App.css'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setShownCountry(null)
    setKeyword(evt.target.value)
  }
  const [shownCountry, setShownCountry] = useState(null)
  const onCountryClick = (name) => {
    setShownCountry(countries.find(_ => _.name === name))
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(_ => {
        setCountries(_.data)
      })
  }, [])


  return (
    <div>
      <h2>Data for countries</h2>
      <Filter keyword={keyword} onKeywordInput={onKeywordInput}/>
      <Countries countries={countries} shownCountry={shownCountry} keyword={keyword} onCountryClick={onCountryClick}/>
    </div>
  )
}

export default App
