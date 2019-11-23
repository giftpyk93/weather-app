import React, { FC } from "react";
import styled from "styled-components";

import config from "../../config";

type IconWeatherPropsType = {
  iconCode: string;
};

const IconWrapper = styled.img`
  width: 48px;
  height: 48px;
  text-align: center;
  object-fit: cover;
`;

export const WeatherIcon: FC<IconWeatherPropsType> = ({ iconCode }) => {
  const iconSrc = `${config.OPEN_WEATHER_ICON_URL}/${iconCode}@2x.png`;
  return <IconWrapper alt="weather-icon" src={iconSrc} />;
};
