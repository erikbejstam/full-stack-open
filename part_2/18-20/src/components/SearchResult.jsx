import Country from './Country'

const SearchResult = ({searchResultObject, handleShow, country}) => {
    if (!searchResultObject) return 
    
    const {searchResultArr, type} = searchResultObject

    let resultToRender = () => {
        switch(type) {
            case 'tooMany':
                return <p>Too many results, try another search term</p>
            case 'one':
                return null
            case 'list':
                return (
                    <div>
                        {searchResultArr.map(country => {
                            return(
                                <div key={country.name.official}>
                                    {country.name.common}
                                    <button onClick={() => handleShow(country)}>show</button>
                                </div>
                            )
                        })}
                    </div>
                )
            case 'none':
                return <p>No country found</p>
        }
    }

    return(
        <div>
            {resultToRender()}
            <Country country={country}/>
        </div>
    )
}

export default SearchResult