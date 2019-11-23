import React, { FC } from "react";
import Grid from "@material-ui/core/Grid";

type WeatherDetailType = {
    label: string;
    value: string;
}

type CurrentWeatherDetailPropsType = {
    weatherDetails: WeatherDetailType[]
};

const CurrentWeatherDetail: FC<CurrentWeatherDetailPropsType> = ({ weatherDetails }) => {
  return (
    <Grid container className="d-flex flex-column p-3">
      <Grid item>
        <h6>CURRENT DETAIL</h6>
      </Grid>
      {weatherDetails.map((weatherDetail: WeatherDetailType) => {
          const {label, value} = weatherDetail
        return (
          <Grid key={label} item container xs={12} className="d-flex flex-row">
            <Grid item xs={1} />
            <Grid item xs={5} className="pl-4">
              {label}
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={5} className="pl-4">
              {value}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CurrentWeatherDetail;
