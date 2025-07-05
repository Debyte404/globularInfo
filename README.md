# 🌍 GlobularInfo

GlobularInfo is a MERN-stack web app designed to enrich your travel experience the moment you land somewhere new. With real-time geolocation, cultural insights, and quirky extras like a location-themed Pokémon, GlobularInfo becomes your intelligent, personalized itinerary planner.

---

## 🚀 Features

### 📍 Location-Based Intelligence
- Automatically detects your current location using browser geolocation.
- Converts latitude/longitude into readable location data (state, country, city) via **API Ninjas Reverse Geocoding API**.

### 🏛️ Historical & Cultural Insight
- Fetches historically relevant facts about your state with **API Ninjas Historical Events API**.
- Offers culturally appropriate food recommendations and lesser-known destinations.

### 🌐 Global Visualization
- Your current location is rendered interactively on a globe using **Three.js**.

### 🧠 AI-Powered Planning
- Uses **Google Gemini API** to generate a smart itinerary enriched with regional facts, sightseeing ideas, and local customs.

### 🌍 Language Localization
- Automatically translates three essential phrases into the local language:
  - “Hello”
  - “Thank you”
  - “Nice”

### 🐾 Pokémon Companion
- Assigns a region-themed Pokémon (via **PokéAPI**) to your journey.
  - Example: Visiting **Assam**? Meet your travel buddy **Rhyhorn**, inspired by the region’s famous one-horned rhino.

---

## 🔧 Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Visualization**: Three.js
- **APIs**:
  - [PokéAPI](https://pokeapi.co/)
  - [API Ninjas - Historical Events](https://api-ninjas.com/api/historicalevents)
  - [API Ninjas - Reverse Geocoding](https://api-ninjas.com/api/reversegeocoding)
  - [Google Gemini API](https://developers.google.com/)

---

## 💡 How It Works

1. On page load, user's location is captured via `navigator.geolocation`.
2. Reverse geocoding translates coordinates into regional info.
3. API calls fetch historical data, location facts, and itinerary suggestions.
4. Translations and Pokémon assignment make the experience fun and localized.

---

## 🔐 Environment Variables

```env
API_NINJAS_KEY=your_api_ninjas_key
GOOGLE_GEMINI_KEY=your_gemini_api_key
MONGO_URI=your_mongodb_connection_string
