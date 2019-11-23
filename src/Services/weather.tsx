import axios from "axios";

import config from "../config";

type LatLngType = { lat: number; lng: number };

const getWeatherLocationFromLatLng = async ({ lat, lng }: LatLngType) => {
  const currentWeatherUrlPath = `${config.OPEN_WEATHER_BASE_API}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`;
  const currentWeather = await axios.get(currentWeatherUrlPath);

  return currentWeather;
};

export { getWeatherLocationFromLatLng };
