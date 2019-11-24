import React, { FC } from "react";
import moment from "moment";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";

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
  width: calc(100vw - 32px);
`;

const HourlyWeather: FC<HourlyWeatherPropsType> = ({ hourlyWeather }) => {
  return (
    <Grid container className="px-3">
      <Grid item>
        <h6>24 HOURS FORCAST</h6>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};

export default HourlyWeather;
