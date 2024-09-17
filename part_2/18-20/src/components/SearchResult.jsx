import Country from './Country'

const SearchResult = ({searchResultObject}) => {
    //console.log('in searchRes')
    //console.log('object: ', searchResultObject)
    if (!searchResultObject) return 
    
    const {searchResultArr, type} = searchResultObject

    let resultToRender = () => {
        switch(type) {
            case 'tooMany':
                return <p>Too many, filter again</p>
            case 'one':
                return <Country country={searchResultArr[0]}/>
            case 'list':
                return searchResultArr.map(country => <div key={country.name.official}>{country.name.common}</div>)
        }
    }

    return(
        <div>
            {resultToRender()}
        </div>
    )
}

export default SearchResult