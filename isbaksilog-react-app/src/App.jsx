import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState({}); // add a new state for weather data
  const [city, setCity] = useState(''); // add a new state for city input
  const [error, setError] = useState(null); // add a new state for error handling

  useEffect(() => {
    // do nothing on mount, wait for user input
  }, []);

  const fetchWeatherData = async () => {
    try {
      const apiKey = 'ec1ba8ea32ede4fb198d891ebd3c201a'; // replace with your API key
      const cityId = getCityId(city); // get the city ID from the city name
      const url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeather({});
    }
  };

  const getCityId = (cityName) => {
    // you need to implement a function to get the city ID from the city name
    // for example, you can use a city ID mapping object
    const cityIdMapping = {
      'New York': 5128581,
      'London': 2643743,
      // add more city IDs here
    };
    return cityIdMapping[cityName];
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          weather.list && (
            <div>
              <h2>{weather.city.name}</h2>
              <p>Temperature: {weather.list[0].main.temp}°F</p>
              <p>Humidity: {weather.list[0].main.humidity}%</p>
              <p>Weather: {weather.list[0].weather[0].description}</p>
            </div>
          )
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;