import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {  
    let isActive = true
    if (search) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          if (isActive) { 
            const filteredCountries = response.data.filter(country =>
              country.name.common.toLowerCase().includes(search.toLowerCase())
            )
            console.log(`${search} useEffect response`)
            setCountries(filteredCountries)
            if (filteredCountries.length === 1) {
              setSelectedCountry(filteredCountries[0])
            }
          }
        })
        .catch(error => console.error('Error fetching countries:', error))
    } else {
      console.log('no search')
      setCountries(null)
    }

    return () => {
      isActive = false;
      console.log(`${search} useEffect cleanup`)
    };
  }, [search])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearchChange} placeholder="Search for a country" />
      {selectedCountry ? (
        <CountryDetail country={selectedCountry} />
      ) : (
        <CountryList countries={countries} onShowCountry={handleShowCountry} />
      )}
    </div>
  )
}

export default App
