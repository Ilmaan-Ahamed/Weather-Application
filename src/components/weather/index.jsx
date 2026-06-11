import { useEffect, useState } from "react";
import Search from "../search";

function kelvinToCelsius(k) {
  if (!k && k !== 0) return "--";
  return Math.round(k - 273.15);
}

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    if (!param) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );

      const data = await response.json();
      if (data && data.cod !== "404") {
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (e) {
      console.log(e);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    if (search && search.trim().length > 0) fetchWeatherData(search.trim());
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Bangalore");
  }, []);

  const iconCode = weatherData?.weather && weatherData.weather[0]?.icon;

  return (
    <div className="weather-root">
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="weather-card">
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
            <div className="temp">{kelvinToCelsius(weatherData?.main?.temp)}°C</div>
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