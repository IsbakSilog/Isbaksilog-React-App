import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [weather, setWeather] = useState({}); // add a new state for weather data
  const [city, setCity] = useState(''); // add a new state for city input
  const [error, setError] = useState(null); // add a new state for error handling
  const [lat, setLat] = useState(''); // add a new state for latitude
  const [lon, setLon] = useState(''); // add a new state for longitude
  const [pngUrl, setPngUrl] = useState(''); // add a new state for PNG URL

  useEffect(() => {
    // do nothing on mount, wait for user input
  }, []);

  const fetchWeatherData = async () => {
    try {
      const url = `http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text(); // get the response text instead of JSON
      try {
        const jsonData = JSON.parse(data); // try to parse the response text as JSON
        setWeather(jsonData);
        setError(null);
        setPngUrl(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=png`);
      } catch (error) {
        setError(`Invalid JSON response: ${error.message}`);
        setWeather({});
        setPngUrl('');
      }
    } catch (error) {
      setError(error.message);
      setWeather({});
      setPngUrl('');
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLatChange = (e) => {
    setLat(e.target.value);
  };

  const handleLonChange = (e) => {
    setLon(e.target.value);
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
        <input
          type="number"
          value={lat}
          onChange={handleLatChange}
          placeholder="Enter latitude"
        />
        <input
          type="number"
          value={lon}
          onChange={handleLonChange}
          placeholder="Enter longitude"
        />
        <button onClick={handleSearch}>Search</button>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          weather.dataseries && (
            <div>
              <h2>{city}</h2>
              <img src={pngUrl} alt="Weather forecast" />
              <p>Temperature: {weather.dataseries[0].temp2m}°C</p>
              <p>Humidity: {weather.dataseries[0].rh2m}%</p>
              <p>Weather: {weather.dataseries[0].weather}</p>
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