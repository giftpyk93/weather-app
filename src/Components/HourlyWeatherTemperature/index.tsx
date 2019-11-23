import React, { FC } from "react";
import moment from "moment";
import styled from "styled-components";

import { TIME_FORMAT } from "Constants/DateTimeFormat";
import { HourlyWeatherType } from "Containers/WeatherLocation/types";
import { WeatherIcon } from "../Icon";

type HourlyWeatherPropsType = {
  hourlyWeather: HourlyWeatherType[];
};

const HourlyWeatherList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  overflow-x: scroll;
  width: 100%;
`;

const HourlyWeather: FC<HourlyWeatherPropsType> = ({ hourlyWeather }) => {
  return (
    <div className="px-3">
      <h6>3 HOURS FORCAST FOR 5 DAYS</h6>
      <HourlyWeatherList>
        {hourlyWeather.map(hourlyWeather => {
          const time = moment(hourlyWeather.dt_txt).format(TIME_FORMAT);
          const temp = hourlyWeather.main.temp + "°C";
          const iconCode = hourlyWeather.weather[0].icon;
          return (
            <div key={hourlyWeather.dt} className="d-flex flex-column align-items-center mx-2">
              <p>{time}</p>
              <WeatherIcon iconCode={iconCode} />
              <p>{temp}</p>
            </div>
          );
        })}
      </HourlyWeatherList>
    </div>
  );
};

export default HourlyWeather;
