import Country from './Country'

const SearchResult = ({ countriesToShow, handleShow, country }) => {
  const { arr, type } = countriesToShow

  const searchResult = (() => {
    switch (type) {
      case 'tooMany':
        return <p>Too many results, try another search term</p>;
  
      case 'none':
        return <p>No country found</p>;
  
      case 'list':
        return (
          <div>
            {arr.map((country) => (
              <div key={country.name.official}>
                {country.name.common}
                <button onClick={() => handleShow(country)} style={{ padding: '2px 5px' }}>show</button>
              </div>
            ))}
          </div>
        );
    }})

  return (
    <div>
        {searchResult()}
        {country ? <Country country={country} /> : null}
    </div>
  )
}

export default SearchResult
