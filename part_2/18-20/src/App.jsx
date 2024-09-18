import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'
import './App.css'


function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [countriesToShow, setCountriesToShow] = useState({arr: [], type: ''})
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => 
        console.log('error: ', error)
      )
  }, [])

  const handleSearchChange = (event) => {
    let searchValue = event.target.value
    setSearch(searchValue)

    let filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchValue.toLowerCase()))

    if (filteredCountries.length > 10){
      setCountry(null)
      setCountriesToShow({arr: [], type: 'tooMany'})
    } else if (filteredCountries.length > 1 ){
      setCountry(null)
      setCountriesToShow({arr: filteredCountries, type: 'list'})
    } else if (filteredCountries.length == 0 ){
      setCountry(null)
      setCountriesToShow({arr: [], type: 'none'})
    } else {
      setCountry(filteredCountries[0])
      setCountriesToShow({arr: filteredCountries, type: 'one'})
    }
  }

  const handleShow = (country) => {
    setCountry(country)
  }

  return (
    <div className='app'>
      <div>
        find countries
        <input 
          value={search}
          onChange={handleSearchChange} />
      </div>

      <SearchResult countriesToShow={countriesToShow} country={country} handleShow={handleShow}/>
    </div>
  )
}

export default App
