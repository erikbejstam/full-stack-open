import Weather from './Weather'

const Country = ({country}) => {
    if (!country) return null

    const languages = Object.values(country.languages)

    return(
        <div>
            <h2>{country.name.common}</h2>

            <p>
                capital {country.capital} <br />
                area {country.area}
            </p>

            <h3>Languages</h3>
        
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>

            <img src={country.flags.png} alt='flag' style={{ maxHeight: '100px' }}></img>

            <Weather country={country} />
        </div>
    )
}

export default Country