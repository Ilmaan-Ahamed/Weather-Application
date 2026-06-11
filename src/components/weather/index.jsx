import { useEffect, useState } from "react";
import Search from "../search";

const API_KEY = "e34b4c51d8c2b7bf48d5217fe52ff79e";

function kelvinToCelsius(k) {
  if (k === undefined || k === null) return null;
  return Math.round(k - 273.15);
}

function kelvinToFahrenheit(k) {
  if (k === undefined || k === null) return null;
  return Math.round((k - 273.15) * (9 / 5) + 32);
}

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("C"); // 'C' or 'F'
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch default city
    fetchWeatherData({ city: "Bangalore" });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  async function fetchWeatherData({ city, lat, lon }) {
    setError(null);
    if (!city && (lat === undefined || lon === undefined)) return;
    setLoading(true);
    try {
      let url = "";
      if (city) url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
      else url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setWeatherData(null);
        setError(data?.message || "Failed to fetch");
      } else {
        setWeatherData(data);
      }
    } catch (e) {
      setWeatherData(null);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (search && search.trim().length > 0) fetchWeatherData({ city: search.trim() });
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherData({ lat: latitude, lon: longitude });
      },
      (err) => {
        setLoading(false);
        setError("Unable to retrieve location");
      },
    );
  }

  function toggleUnit() {
    setUnit((u) => (u === "C" ? "F" : "C"));
  }

  function saveFavorite() {
    const city = weatherData?.name;
    if (!city) return;
    setFavorites((prev) => {
      if (prev.includes(city)) return prev;
      return [city, ...prev].slice(0, 6);
    });
  }

  function selectFavorite(city) {
    setSearch(city);
    fetchWeatherData({ city });
  }

  const iconCode = weatherData?.weather && weatherData.weather[0]?.icon;
  const tempK = weatherData?.main?.temp;
  const temp = unit === "C" ? kelvinToCelsius(tempK) : kelvinToFahrenheit(tempK);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="weather-root">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        favorites={favorites}
        onSelectFavorite={selectFavorite}
        onUseLocation={handleUseLocation}
      />

      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
        <button onClick={toggleUnit} style={{padding:'6px 10px',borderRadius:8,border:'1px solid rgba(212,175,55,0.08)',background:'transparent',color:'var(--accent)'}}>
          Unit: {unit}
        </button>
        <button onClick={saveFavorite} style={{padding:'6px 10px',borderRadius:8,border:'1px solid rgba(212,175,55,0.08)',background:'transparent',color:'var(--muted)'}}>
          Save Favorite
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="weather-card">
          {error && (
            <div style={{color:'#ffcc00',marginBottom:10,fontWeight:700}}>{error}</div>
          )}

          <div className="weather-header">
            <div className="city-name">
              <h2>
                {weatherData?.name || "Unknown"}, <span>{weatherData?.sys?.country || "--"}</span>
              </h2>
              <p className="date">{getCurrentDate()}</p>
            </div>
            {iconCode ? (
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                alt={weatherData?.weather?.[0]?.description || "weather icon"}
              />
            ) : null}
          </div>

          <div className="main-info">
            <div className="temp">{temp !== null ? `${temp}°${unit}` : "--"}</div>
            <p className="description">{weatherData?.weather?.[0]?.description || "-"}</p>
          </div>

          <div className="weather-info">
            <div className="column">
              <p className="label">Wind</p>
              <p className="value">{weatherData?.wind?.speed ? `${weatherData.wind.speed} m/s` : "--"}</p>
            </div>
            <div className="column">
              <p className="label">Humidity</p>
              <p className="value">{weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : "--"}</p>
            </div>
            <div className="column">
              <p className="label">Pressure</p>
              <p className="value">{weatherData?.main?.pressure ? `${weatherData.main.pressure} hPa` : "--"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}