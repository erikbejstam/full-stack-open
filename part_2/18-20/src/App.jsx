import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'


function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [search, setSearch] = useState('')
  const [searchResultObject, setSearchResultObject] = useState({searchResultArr: [], type: ''})
  const [country, setCountry] = useState(null)
  
  const app = {
    margin: '10px'
  }

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
      setSearchResultObject({searchResultArr: [], type: 'tooMany'})
      setCountriesToShow([])
    } else if (filteredCountries.length > 1 ){
      setCountry(null)
      setSearchResultObject({searchResultArr: filteredCountries, type: 'list'})
      setCountriesToShow(filteredCountries)
    } else if (filteredCountries.length == 0 ){
      setCountry(null)
      setSearchResultObject({searchResultArr: [], type: 'none'})
      setCountriesToShow([])
    } else {
      setSearchResultObject({searchResultArr: filteredCountries, type: 'one'})
      setCountry(filteredCountries[0])
    }
  }

  const handleShow = (country) => {
    setCountry(country)
  }

  return (
    <div style={app}>
      <div>
        find countries
        <input 
          value={search}
          onChange={handleSearchChange} />
      </div>

      <SearchResult searchResultObject={searchResultObject} country={country} handleShow={handleShow}/>
    </div>
  )
}

export default App
