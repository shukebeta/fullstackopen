import React, {useState, useEffect} from 'react'
import Countries from "./components/Countries"
import Filter from "./components/Filter"
import './App.css'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [keyword, setKeyword] = useState('')
  const onKeywordInput = (evt) => {
    setKeyword(evt.target.value)
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
      <Countries countries={countries} keyword={keyword}/>
    </div>
  )
}

export default App
