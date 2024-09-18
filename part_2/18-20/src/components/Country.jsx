const Country = ({country}) => {
    if (!country) return null

    const languages = Object.values(country.languages)

    return(
        <div>
            <h2>{country.name.common}</h2>

            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h3>Languages</h3>
        
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>

            <img src={country.flags.png}></img>
        </div>
    )
}

export default Country