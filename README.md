# Weather Application

## ✨ Introduction

A sleek, modern Weather Application built with React and the OpenWeatherMap API. The UI follows a premium black & gold aesthetic and provides a focused, responsive experience for quickly checking current weather conditions.

## 🚀 Features

👉 **🔎 City Search**
- Search current weather by city name
- Press Enter or click Search to fetch

👉 **📍 Location**
- Use browser geolocation to fetch local weather (permission required)

👉 **🌡️ Unit Toggle**
- Switch between Celsius and Fahrenheit

👉 **⭐ Favorites**
- Save favorite cities to `localStorage` for quick access

👉 **🛡️ Error Handling**
- Clear messages for city not found, network errors, and API issues

## ⚙️ Tech Stack

| Technology | Description |
|---|---|
| React 19 | UI components & state management |
| Vite 8 | Fast dev server & build tool |
| OpenWeatherMap API | Current weather data (API key required) |
| CSS3 | Custom properties, responsive layout, glassmorphism |
| Google Fonts | Inter typeface |

## 📁 Project Structure

```
Weather-Application/
│
├── src/
│   ├── components/
│   │   ├── search/
│   │   │   └── index.jsx    # Search form & favorites
│   │   └── weather/
│   │       └── index.jsx    # Weather view & logic
│   │
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point (imports styles)
│   └── styles.css           # Global styles (black + gold theme)
│
├── index.html               # HTML template
├── package.json
└── vite.config.js
```

## 🤸 Quick Start

1️⃣ Install dependencies and run the dev server

```powershell
cd 'e:\Projects\New Projects''26\WeatherApp\Weather-Application'
npm install
npm run dev
```

2️⃣ Open the URL printed by Vite (usually `http://localhost:5173`).

## 🔐 API Key

This project uses the OpenWeatherMap API. Right now the API key is stored in `src/components/weather/index.jsx`. For production or safer handling, create a `.env` file at the project root and add:

```text
VITE_OPENWEATHER_KEY=your_api_key_here
```

Then access it in code with `import.meta.env.VITE_OPENWEATHER_KEY`.

## 📊 How It Works

1. User enters a city name or chooses "Use my location"
2. App requests current weather from OpenWeatherMap (by city or coords)
3. App displays a weather card: location, temp, description, icon, and stats
4. User can toggle units and save favorites (persisted to `localStorage`)
5. App shows friendly error messages on failures

## New Features 

- Consider moving the API key to environment variables (Vite `.env`).
- Add a 5-day forecast panel using OpenWeather's One Call API.
- Improve accessibility: focus states, aria-live regions for errors.
- Add animations and transitions for a more premium feel.

If you want, I can:
- Move the API key to `.env` and update the code to use `import.meta.env`.
- Add a 5-day forecast component and design mockups.
- Produce screenshots or a short demo recording of the app running locally.

