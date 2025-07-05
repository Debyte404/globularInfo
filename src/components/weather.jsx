import "./componentsCss/weather.css";
import React, { useEffect, useState } from "react";

import { UserContext } from "../context/UserContext";

export default function Weather() {
  const { region, State, country, weather } = React.useContext(UserContext);
  const [iconUrl, setIconUrl] = useState("");

  function getWeatherIconCode(
    temp,
    cloud_pct,
    humidity,
    wind_speed,
    sunrise,
    sunset
  ) {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const isDay = now >= sunrise && now <= sunset; // Compare with API times
    const suffix = isDay ? "d" : "n"; // 'd' for day, 'n' for night

    // Assign icon code based on logic
    if (temp > 30) return `01${suffix}`; // Clear sky but hot (sun icon)
    if (temp < 5) return `13${suffix}`; // Snow/cold
    if (cloud_pct > 80) return `04${suffix}`; // Overcast
    if (cloud_pct > 50) return `03${suffix}`; // Scattered clouds
    if (humidity > 85) return `50${suffix}`; // Mist
    if (wind_speed > 6) return `09${suffix}`; // Breezy/rainy look

    return `02${suffix}`; // Few clouds (default fallback)
  }

  function getIconURL(weatherData) {
    const { temp, cloud_pct, humidity, wind_speed, sunrise, sunset } =
      weatherData;

    const iconCode = getWeatherIconCode(
      temp,
      cloud_pct,
      humidity,
      wind_speed,
      sunrise,
      sunset
    );
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  useEffect(() => {
    if (weather && weather !== null) {
      const url = getIconURL(weather);
      setIconUrl(url);
    }
  }, [weather]);

  return (
    <div className="weather-container">
      <h2 className="weather-address">
        {region !==null ? (region) : (<span style={{color:"red"}}>Failed</span>)}, {State !==null ? (State) : (<span style={{color:"red"}}>To</span>)}, {country !==null ? (country) : (<span style={{color:"red"}}>Get</span>)}
      </h2>
      {/* <h3>Current Temp: {weather.temp}°C</h3>
      <img src={iconUrl} alt="weather icon" />
      <p>Humidity: {weather.humidity}%</p>
      <p>Feels Like: {weather.feels_like}°C</p> */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Current Temp 🌡️:{" "}
        {weather?.temp !== undefined ? (
          `${weather.temp}°C`
        ) : (
          <img
            src="/assets/loading1.gif"
            alt="loading"
            style={{ height: "20px" }}
          />
        )}
      </h3>

      {iconUrl ? (
        <img src={iconUrl} alt="weather icon" />
      ) : (
        <img
          src="/assets/loading.gif"
          alt="loading"
          style={{ height: "40px" }}
        />
      )}

      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Humidity:{" "}
        {weather?.humidity !== undefined ? (
          `${weather.humidity}%`
        ) : (
          <img
            src="/assets/loading1.gif"
            alt="loading"
            style={{ height: "20px" }}
          />
        )}
      </p>

      <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        Feels Like:{" "}
        {weather?.feels_like !== undefined ? (
          `${weather.feels_like}°C`
        ) : (
          <img
            src="/assets/loading1.gif"
            alt="loading"
            style={{ height: "20px" }}
          />
        )}
      </p>

      {/* <p>Scroll down for more</p> */}
    </div>
  );
}
