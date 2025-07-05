import React, { useState, useEffect } from "react";
import "./pagestyles/home.css"; // Assuming you have a CSS file for styling

import GlobeWithLocation from "../components/GlobePart"; // Adjust the import path as necessary

import Card from "../components/Cards";
import ScrollDown from "../components/scrolldown";
import Weather from "../components/weather";
import Loader from "../components/loader";
import axios from "axios";

import { backendAPI } from "../config"; // Adjust the import path as necessary
import { UserContext } from "../context/UserContext";
import FloatingVoiceControl from '../components/voice';

import MainLoader from "../components/mainloader";

// const data = {
//   foods: [
//     {
//       name: "Masor Tenga",
//       description:
//         "A quintessential Assamese sour fish curry. The tangy flavor is derived from ingredients like tomatoes, elephant apple (ou tenga), or lemon, making it a light and refreshing dish.",
//     },
//     {
//       name: "Khaar",
//       description:
//         "A unique traditional dish made using an alkaline extract from sun-dried banana peels. It's often prepared with raw papaya, pulses, or fish and has a very distinct, earthy taste.",
//     },
//     {
//       name: "Pitha",
//       description:
//         "A variety of rice cakes that are a staple during festivals like Bihu. They can be sweet or savory, with popular versions like Til Pitha (rice crepes with sesame filling) and Ghila Pitha (fried rice flour cakes).",
//     },
//   ],
//   destinations: [
//     {
//       name: "Pobitora Wildlife Sanctuary",
//       description:
//         "Located a short drive from Chandrapur, this sanctuary is known for having one of the highest densities of one-horned rhinoceroses in the world. It offers excellent wildlife viewing opportunities without the crowds of larger parks.",
//     },
//     {
//       name: "Chandubi Lake",
//       description:
//         "A serene natural lake formed by the great earthquake of 1897. Surrounded by deep forests and small villages of the Rabha tribe, it's a perfect spot for boating, bird watching, and experiencing local tribal culture.",
//     },
//     {
//       name: "Topatoli",
//       description:
//         "A lesser-known village area near the Brahmaputra River offering scenic views, especially during sunrise and sunset. It provides a glimpse into the rural riverine life of Assam, away from commercial tourist spots.",
//     },
//   ],
//   sentances: {
//     localLanguage: "Assamese",
//     hello: "Nomoskar",
//     thankyou: "Dhonyobad",
//     nice: "Dhuniya",
//   },
//   pokemon: {
//     name: "Rhyhorn",
//     description:
//       "A popular Pokémon from the region known for its rock-hard skin and powerful charge attack. compared to the one horn Rhino",
//   },
// };

export default function HomePage() {
  const [pokemon, setPokemon] = useState(null);

  const [mainLoader, setMainLoader] = useState(false);

  useEffect(() => {
    const pingBackend = async () => {
      try {
        setMainLoader(true);
        const response = await axios.get(`${backendAPI}/wake`);
        if (response.status === 200) {

            setMainLoader(false)
        }
      } catch (err) {
        console.error("Error waking up backend:", err.message);
        // You could retry, show error, or fallback logic here
      }
    };

    pingBackend();
  }, []);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [data, setData] = useState(null);
  const [facts, setFacts] = useState(null);

  const {
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
  } = React.useContext(UserContext);

  function requestLocation(setLatitude, setLongitude) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        alert("Please enable location access to generate your itinerary.");
        // Retry after user acknowledges alert
        navigator.geolocation.getCurrentPosition(
          (retryPosition) => {
            setLatitude(retryPosition.coords.latitude);
            setLongitude(retryPosition.coords.longitude);
          },
          (retryError) => {
            console.error("Second attempt failed:", retryError);
          }
        );
      }
    );
  }

  async function fetchData() {
    console.log("Fetching data for itinerary...");
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendAPI}/generate-itinerary`,
        location
      );

      const itineraryData = response.data;
      setData(itineraryData);

      console.log("Itinerary data received:", itineraryData);
      //   if (data) {
      var pokemonName = itineraryData.pokemon.name.toLowerCase();

      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => res.json())
        .then((data) => {
          const imageUrl = data.sprites.front_default;
          setPokemon(imageUrl);
          console.log(imageUrl); // 👉 https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
        });
      //   } else {
      //     console.error("No data received for itinerary.");
      //     alert("Failed to generate itinerary. Please try again later.");
      //   }
    } catch (error) {
      console.error("Error fetching itinerary data:", error);
      alert("Failed to fetch itinerary data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function handleClick(mode) {

      if (!longitude || !latitude) {
        //   alert("Please enable location access to generate your itinerary.");
        requestLocation(setLatitude, setLongitude);
        return;
      }

      setLoading(true);
      fetchData();
    
  }

  async function handleClick_history() {
    if (!longitude || !latitude) {
      //   alert("Please enable location access to generate your itinerary.");  
      requestLocation(setLatitude, setLongitude);
      return;
    }
    setLoading2(true);

    try {
      const response = await axios.get(`${backendAPI}/place-history`, {
        params: { place : State.toLowerCase() }  // Sends ?place=YourPlace
        });
    console.log(response.data); // Historical facts array
     const historyData = response.data;
      setFacts(historyData);
      console.log("History data received:", historyData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      alert("Failed to fetch historical data. Please try again later.");
    } finally {
      setLoading2(false);
    }
}
  //   useEffect(() => {
  //     var pokemonName = data.pokemon.name.toLowerCase();

  //     fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const imageUrl = data.sprites.front_default;
  //         setPokemon(imageUrl);
  //         console.log(imageUrl); // 👉 https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
  //       });
  //   }, []); // Empty dependency array to run only once on mount

  return (
    <>
      {/* <Loader /> */}
      {mainLoader && <MainLoader />}
      <ScrollDown />
      <Weather />
      <div className="home-page">
        <main className="home-main">
          <GlobeWithLocation />
        </main>

        <div className="info-section">
          {data === null ? (
            <div className="row">
              <h2 className="section-title">Generate</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading ? <Loader /> : null}
                <p className="section-text">
                  Click the button below to generate a unique travel itinerary
                  based on your location.
                </p>
                <button id="generate-btn" className="section-buton" onClick={handleClick}>
                  Proceed
                </button>
              </div>
            </div>
          ) : (
            { data } && (
              <>
                <div className="row">
                  <h2 className="section-title">🍽️ Local Foods</h2>

                  {data.foods.map((food, idx) => (
                    <Card
                      key={`food-${idx}`}
                      title={food.name}
                      description={food.description}
                    />
                  ))}
                </div>

                <div className="row">
                  <h2 className="section-title">🌍 Destinations</h2>

                  {data.destinations.map((dest, idx) => (
                    <Card
                      key={`dest-${idx}`}
                      title={dest.name}
                      description={dest.description}
                      link={dest.name.toLocaleLowerCase()}
                    />
                  ))}
                </div>

                <div className="row">
                  <h2 className="section-title">
                    Vocab for {data.sentances.localLanguage}
                  </h2>

                  <Card
                    title="Greating"
                    description={`Hello : ${data.sentances.hello}`}
                  />
                  <Card
                    title="Gratitude"
                    description={`Thankyou : ${data.sentances.thankyou}`}
                  />
                  <Card
                    title="Appreciation"
                    description={`Nice : ${data.sentances.nice}`}
                  />
                </div>

                <Card
                  title="Pokémon of the Region"
                  image={pokemon}
                  description={
                    data.pokemon.description ||
                    "A popular Pokémon from the region."
                  }
                />
              </>
            )
          )}

          {facts === null ? (
            <div className="row">
              <h2 className="section-title">Facts</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loading2 ? <Loader /> : null}
                <p className="section-text">
                  Click the button below to get some historical facts about your State.
                </p>
                <button id="facts-btn" className="section-buton" onClick={handleClick_history}>
                  Proceed
                </button>
              </div>
            </div>
          ) : (
            { facts } && (
              <>
                <div className="row">
                  <h2 className="section-title">Facts</h2>

                  {facts.map((foo, idx) => (
                    <Card
                      key={`food-${idx}`}
                      title={`${foo.day} - ${foo.month} - ${foo.year}`}
                      description={foo.event}
                    />
                  ))}
                </div>
            </>
            ))}
        </div>
        <footer>
          <p className="footer-text">
            © 2025 Globular Info. Submission for Call2Code.
          </p>
        </footer>
      </div>
      <FloatingVoiceControl />
      {/* <button onClick={handleClick}>Generate Itinerary</button> */}
    </>
  );
}
