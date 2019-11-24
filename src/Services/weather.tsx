import axios from "axios";

import config from "config";

type LatLngType = { lat: number; lng: number };

const getCurrenWeather = async ({ lat, lng }: LatLngType) => {
  const currentWeatherUrlPath = `${config.OPEN_WEATHER_BASE_API}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`;
  const { data } = await axios.get(currentWeatherUrlPath);
  return data;
};

const getHourlyWeather = async ({ lat, lng }: LatLngType) => {
  const hourlyWeatherUrlPath = `${config.OPEN_WEATHER_BASE_API}/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`;
  const { data } = await axios.get(hourlyWeatherUrlPath);
  return data.list;
};

export { getCurrenWeather, getHourlyWeather };
