import React, { createContext, useState, useEffect, use } from "react";
import axios from "axios";

import { backendAPI } from "../config";
// 1. Create a context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [region, setRegion] = useState(null);
  const [State, setState] = useState(null);
  const [country, setCountry] = useState(null);
  const [location, setLocation] = useState(null);

  const [response, setResponse] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (longitude === null || latitude === null) return;

    // Fetch user location data from backend
    const fetchUserLocation = async () => {
      try {
        const response = await axios.post(`${backendAPI}/location`, {
          longitude,
          latitude,
        });
        const { name, state, country } = response.data;

        setRegion(name);
        setState(state);
        setCountry(country);

        setLocation(response.data);

        try {
        //   setLoading(true);
          const response = await axios.post(`${backendAPI}/weather`, {
            longitude,
            latitude,
          });
          const weatherData = response.data;
          setWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        //   alert("Failed to fetch weather data. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };

    fetchUserLocation();
  }, [longitude, latitude]);

  return (
    <UserContext.Provider
      value={{
        longitude,
        setLongitude,
        latitude,
        setLatitude,
        region,
        setRegion,
        State,
        setState,
        country,
        setCountry,
        response,
        setResponse,
        weather,
        setWeather,
        location,
        setLocation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
