import React, {useEffect, useState} from 'react'
import {nanoid} from 'nanoid'
import axios from 'axios'

const weatherApiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY
const currentWeatherApiBaseUrl = `http://api.weatherstack.com/current?access_key=${weatherApiKey}`
const getQueryUrl = (city) => `${currentWeatherApiBaseUrl}&query=${encodeURIComponent(city)}`

const Weather = ({cityName}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    axios.get(getQueryUrl(cityName)).then(_ => {
      setWeather(_.data)
    })
  }, [cityName])
  return (
    <>
      <h2>Weather in {cityName}</h2>
      {
        weather &&
        <>
          <p>{weather.current.weather_descriptions.join('<br />')}</p>
          <p>
            temperature: {weather.current.temperature}
          </p>
          <p>
            {
              weather.current.weather_icons.map(_ => <img alt={`${cityName}'s weather`} className="flag" src={_}
                                                          key={nanoid()}/>)
            }
          </p>
          <p>
            wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}
          </p>
        </>
      }
    </>
  )
}

export default Weather
