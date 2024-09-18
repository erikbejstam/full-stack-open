import axios from "axios"
import { useEffect, useState } from "react"
import.meta.env.VITE_API_KEY

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)

    const apiKey = import.meta.env.VITE_API_KEY;

    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    useEffect(() => {
        axios
        .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
            setWeather(response.data);
        })
        .catch((error) => {
            console.log("Error fetching weather data:", error);
        });
    }, [lat, lon]);

    if (!weather) return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>Loading weather...</p>
        </div>
    )

    return(
        <div>
            <h3>Weather in {country.capital}</h3>

            <p>
                temperature {weather.main.temp} Celsius <br />

                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}></img><br />

                {weather.wind.speed} m/s
            </p>
        </div>
    )
}

export default Weather