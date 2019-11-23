import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { isEmpty, get } from "lodash";

import { getWeatherLocationFromLatLng } from "../../Services/weather";
import COLORS from '../../Constants/Colors'
import CurrentWeatherTemperature from "../../Components/CurrentWeatherTemperature";
import CurrentWeatherDetail from "../../Components/CurrentWeatherDetail";
import AutocompleteSearchLocation from "../AutoCompleteSearchLocation";

export type SearchLocationValueType = {
  place_name: string;
  geometry: {
    coordinates: number[];
  };
};

type CurrentWeatherMainType = {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  pressure: number;
};

type CurrentWeatherWeatherType = {
  icon: string;
  main: string;
};

type CurrentWeatherWindType = {
  speed: number;
};

type CurrentWeatherType = {
  main: CurrentWeatherMainType;
  weather: CurrentWeatherWeatherType[];
  wind: CurrentWeatherWindType;
};

const SearchContainer = styled.div`
  width: 100%;
  background-color: ${COLORS.BLACK};
  padding: 8px;
`;

const WeatherLocation: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>();
  const [selectedPlace, setSelectedPlace] = useState("");

  const handleChange = async (e: ChangeEvent<{}>, value: SearchLocationValueType) => {
    if (!isEmpty(value)) {
      const { place_name, geometry } = value;
      setSelectedPlace(place_name);
      const latLng = {
        lat: geometry.coordinates[1],
        lng: geometry.coordinates[0],
      };
      const weatherLocation = await getWeatherLocationFromLatLng(latLng);
      setCurrentWeather(weatherLocation.data as CurrentWeatherType);
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
          <CurrentWeatherDetail weatherDetails={weatherDetails} />
        </>
      )}
    </>
  );
};

export default WeatherLocation;
