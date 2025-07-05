import React, { createContext, useState, useEffect, use } from "react";
import axios from "axios";

import { backendAPI } from "../config";
// 1. Create a context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [State, setState] = useState(null);
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (longitude === null || latitude === null) return;

        // Fetch user location data from backend
        const fetchUserLocation = async () => {
            try {
                const response = await axios.post(`${backendAPI}/user/location`,{longitude, latitude});
                const { state, country } = response.data;

                setState(state);
                setCountry(country);
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
        State,
        setState,
        country,
        setCountry
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
