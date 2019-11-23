import dotenv from "dotenv";

dotenv.config();

const config = {
  MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
  MAPBOX_SEARCH_PLACES_API: "https://api.mapbox.com/geocoding/v5/mapbox.places",

  OPEN_WEATHER_API_KEY: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_BASE_API: "https://api.openweathermap.org/data/2.5",
  OPEN_WEATHER_ICON_URL: "http://openweathermap.org/img/wn",
};

export default config;
