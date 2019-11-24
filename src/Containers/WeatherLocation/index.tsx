import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { isEmpty, get, take } from "lodash";

import { getCurrentWeather, getHourlyWeather } from "Services/weather";
import COLORS from "Constants/Colors";
import CurrentWeatherTemperature from "Components/CurrentWeatherTemperature";
import CurrentWeatherDetail from "Components/CurrentWeatherDetail";
import HourlyWeatherTemperature from "Components/HourlyWeatherTemperature";
import AutocompleteSearchLocation from "../AutoCompleteSearchLocation";
import { CurrentWeatherType, HourlyWeatherType, SearchLocationValueType } from "./types";

const LOCAL_STORAGE_KEY = {
  CURRENT_WEATHER: "CURRENT_WEATHER",
  HOURLY_WEATHER: "HOURLY_WEATHER",
  SELECTED_PLACE: "SELECTED_PLACE",
};

const HOURLY_WEATHER_LENGTH = 8;

const SearchContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.BLACK};
  padding: 8px;
`;

const saveDataToLocalStorage = (
  currentWeatherLocation: CurrentWeatherType,
  hourlyWeatherLocation: HourlyWeatherType[],
  place: string,
) => {
  const computedCurrentWeatherLocation = JSON.stringify(currentWeatherLocation);
  const computedHourlyWeatherLocation = JSON.stringify(hourlyWeatherLocation);

  localStorage.setItem(LOCAL_STORAGE_KEY.CURRENT_WEATHER, computedCurrentWeatherLocation);
  localStorage.setItem(LOCAL_STORAGE_KEY.HOURLY_WEATHER, computedHourlyWeatherLocation);
  localStorage.setItem(LOCAL_STORAGE_KEY.SELECTED_PLACE, place);
};

const getDataFromLocalStorage = () => {
  const rememberedCurrentWeatherLocation = localStorage.getItem(LOCAL_STORAGE_KEY.CURRENT_WEATHER);
  const rememberedHourlyWeatherLocation = localStorage.getItem(LOCAL_STORAGE_KEY.HOURLY_WEATHER);
  const rememberedSelectedPlace = localStorage.getItem(LOCAL_STORAGE_KEY.SELECTED_PLACE);

  const convertedRememberedCurrentWeatherLocation =
    rememberedCurrentWeatherLocation && JSON.parse(rememberedCurrentWeatherLocation);
  const convertedRememberedHourlyWeatherLocation =
    rememberedHourlyWeatherLocation && JSON.parse(rememberedHourlyWeatherLocation);

  return {
    rememberedCurrentWeatherLocation: convertedRememberedCurrentWeatherLocation,
    rememberedHourlyWeatherLocation: convertedRememberedHourlyWeatherLocation,
    rememberedSelectedPlace: rememberedSelectedPlace,
  };
};

const WeatherLocation: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>();
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeatherType[]>([]);
  const [selectedPlace, setSelectedPlace] = useState("");

  useEffect(() => {
    const {
      rememberedCurrentWeatherLocation,
      rememberedHourlyWeatherLocation,
      rememberedSelectedPlace,
    } = getDataFromLocalStorage();

    if (rememberedCurrentWeatherLocation && rememberedHourlyWeatherLocation && rememberedSelectedPlace) {
      setCurrentWeather(rememberedCurrentWeatherLocation);
      setHourlyWeather(rememberedHourlyWeatherLocation);
      setSelectedPlace(rememberedSelectedPlace);
    }
  }, []);

  const handleChange = async (e: ChangeEvent<{}>, value: SearchLocationValueType) => {
    if (!isEmpty(value)) {
      const { place_name, geometry } = value;
      if (value.geometry) {
        setSelectedPlace(place_name);
        const latLng = {
          lat: geometry.coordinates[1],
          lng: geometry.coordinates[0],
        };

        const [currentWeatherLocation, hourlyWeatherLocation] = await Promise.all<CurrentWeatherType, HourlyWeatherType[]>([
          getCurrentWeather(latLng),
          getHourlyWeather(latLng),
        ]);

        const hourlyWeatherLocationWithin24Hr = take(hourlyWeatherLocation, HOURLY_WEATHER_LENGTH);

        saveDataToLocalStorage(currentWeatherLocation, hourlyWeatherLocationWithin24Hr, place_name);
        setCurrentWeather(currentWeatherLocation);
        setHourlyWeather(hourlyWeatherLocationWithin24Hr);
      } else {
        alert(`Sorry, no results for '${value}'`);
      }
    }
  };

  const currentTemp = get(currentWeather, "main.temp");
  const iconCode = get(currentWeather, "weather[0].icon");
  const maxTemp = get(currentWeather, "main.temp_max");
  const minTemp = get(currentWeather, "main.temp_min");
  const weatherStatus = get(currentWeather, "weather[0].main");

  const humidity = get(currentWeather, "main.humidity");
  const wind = get(currentWeather, "wind.speed");
  const pressure = get(currentWeather, "main.pressure");
  const weatherDetails = [
    {
      label: "Humidity",
      value: `${humidity}%`,
    },
    {
      label: "Wind",
      value: `${wind} meter/sec`,
    },
    {
      label: "Pressure",
      value: `${pressure} hPa`,
    },
  ];

  return (
    <>
      <SearchContainer>
        <AutocompleteSearchLocation onChange={handleChange} />
      </SearchContainer>
      {!isEmpty(currentWeather) && (
        <>
          <CurrentWeatherTemperature
            currentTemp={currentTemp}
            iconCode={iconCode}
            place={selectedPlace}
            maxTemp={maxTemp}
            minTemp={minTemp}
            weatherStatus={weatherStatus}
          />
          <hr />
          <HourlyWeatherTemperature hourlyWeather={hourlyWeather} />
          <hr />
          <CurrentWeatherDetail weatherDetails={weatherDetails} />
        </>
      )}
    </>
  );
};

export default WeatherLocation;
