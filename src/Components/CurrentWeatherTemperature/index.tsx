import React, { FC } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

import { DATE_FORMAT } from "../../Constants/DateTimeFormat";
import { WeatherIcon } from "../Icon";

type CurrentWeatherPropsType = {
  currentTemp: number;
  iconCode: string;
  place: string;
  maxTemp: number;
  minTemp: number;
  weatherStatus: string;
};

const LocationText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const DateText = styled.p`
  font-size: 1.2rem;
`;

const CurrentTempText = styled.p`
  font-size: 4rem;
  font-weight: bold;
`;

const CurrentWeather: FC<CurrentWeatherPropsType> = props => {
  const { currentTemp, iconCode, place, maxTemp, minTemp, weatherStatus } = props;
  const currentDate = moment().format(DATE_FORMAT);
  return (
    <Grid container direction="column" className="p-3">
      <Grid item xs={12}>
        <LocationText>{place}</LocationText>
        <DateText>{currentDate}</DateText>
        <p>
          MIN {minTemp}°C, MAX {maxTemp}°C
        </p>
      </Grid>
      <Grid item container xs={12} direction="column" alignItems="center">
        <Grid item>
          <WeatherIcon iconCode={iconCode} />
        </Grid>
        <Grid item>
          <CurrentTempText>{currentTemp}°C</CurrentTempText>
        </Grid>
        <Grid item>
          <p>{weatherStatus}</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CurrentWeather;
