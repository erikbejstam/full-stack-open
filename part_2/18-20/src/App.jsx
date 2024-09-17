import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'


function App() {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [search, setSearch] = useState('')
  const [searchResultObject, setSearchResultObject] = useState({searchResultArr: [], type: ''})
  
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
      setSearchResultObject({searchResultArr: [], type: 'tooMany'})
      setCountriesToShow([])
    } else if (filteredCountries.length > 1 ){
      setSearchResultObject({searchResultArr: filteredCountries, type: 'list'})
      setCountriesToShow(filteredCountries)
    }
    else {
      setSearchResultObject({searchResultArr: filteredCountries, type: 'one'})
      setCountriesToShow(filteredCountries)
    }
  }

  return (
    <div>
      <div>
        find countries
        <input 
          value={search}
          onChange={handleSearchChange} />
      </div>

      <SearchResult searchResultObject={searchResultObject}/>
    </div>
  )
}

export default App
