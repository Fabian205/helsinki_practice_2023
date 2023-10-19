import React, { useState, useEffect } from "react";
import axios from "axios";

const CountrySearch = () => {
  const [country, setCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tooManyResults, setTooManyResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (searchTerm.trim().length === 1) {
      // Clear previous suggestions if only one letter is entered
      setSuggestions([]);
      setCountry(null);
      setTooManyResults(false);
      setError("Too many matches, specify another filter");
      setLoading(false);
      return;
    }

    if (searchTerm.trim() === "") {
      // Clear suggestions if search term is empty
      setSuggestions([]);
      setCountry(null);
      setTooManyResults(false);
      setError(null);
      setLoading(false);
      return;
    }

    // Make API request when search term changes
    setLoading(true);
    setError(null);

    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => {
        if (response.data.length > 10) {
          // If there are too many results, suggest the first 10
          setSuggestions(response.data.slice(0, 10));
          setCountry(null);
          setTooManyResults(true);
        } else if (response.data.length === 1) {
          // If there is only one result, show details automatically
          setCountry(response.data[0]);
          setSuggestions([]);
          setTooManyResults(false);
        } else if (response.data.length > 1) {
          // If there are results, suggest them
          setSuggestions(response.data);
          setTooManyResults(false);
        } else {
          // If no country is found, clear suggestions
          setSuggestions([]);
          setCountry(null);
          setTooManyResults(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching country information:", error);
        setError("Error fetching country information. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    // ... (rest of the existing code)

    // Fetch weather data for the capital if a country is selected
    if (country && country.capital) {
      const apiKey = "09df78205dbd70d11cbb0fe655d727e9"; // Replace with your OpenWeatherMap API key
      const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`;

      axios
        .get(weatherEndpoint)
        .then((weatherResponse) => {
          // Assuming that the API response structure follows OpenWeatherMap's format
          setWeather(weatherResponse.data);
          console.log(weatherResponse.data);
        })
        .catch((weatherError) => {
          console.error("Error fetching weather information:", weatherError);
          setWeather(null); // Clear weather data if an error occurs
        });
    }
  }, [country]);

  const handleSearchChange = (event) => {
    // Update search term when input changes
    setSearchTerm(event.target.value);
  };

  const handleDetailsClick = (selectedCountry) => {
    // Set the selected country for detailed view
    setCountry(selectedCountry);
    setSuggestions([]);
    setTooManyResults(false);
    setError(null);
  };

  return (
    <div>
      <form>
        find countries
        <input
          type="text"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {(tooManyResults || suggestions.length > 0) && (
        <div>
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.name.common}>
                {suggestion.name.common}{" "}
                <button onClick={() => handleDetailsClick(suggestion)}>
                  Show
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      
      {country && !tooManyResults && (
        <div>
          <h3>{country.name.common}</h3>
          <div>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
          </div>
          <h4>Languages:</h4>
          <div>
            <ul>
              {Object.entries(country.languages).map(([code, name]) => (
                <li key={code}>{`${name}`}</li>
              ))}
            </ul>
          </div>
          <div>
            {country.flags && (
              <img
                src={country.flags.png}
                alt={`${country.name.common} Flag`}
              />
            )}
          </div>
          {weather && (
            <div>
              <h4>Weather in {country.capital}</h4>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              {/* Add more weather details as needed */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
