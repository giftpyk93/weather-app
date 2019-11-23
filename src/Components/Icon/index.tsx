import React, { FC } from "react";
import styled from "styled-components";

import config from "config";

type IconWeatherPropsType = {
  iconCode: string;
  size?: "small" | "big";
};

const ICON_SIZE = {
  small: "48px",
  big: "60px",
};

const SMALL = "small";

const IconWrapper = styled.img<Pick<IconWeatherPropsType, "size">>`
  width: ${({ size }) => ICON_SIZE[size || SMALL]};
  height: ${({ size }) => ICON_SIZE[size || SMALL]};
  text-align: center;
  object-fit: cover;
`;

export const WeatherIcon: FC<IconWeatherPropsType> = ({ iconCode, size }) => {
  const iconSrc = `${config.OPEN_WEATHER_ICON_URL}/${iconCode}@2x.png`;
  return <IconWrapper alt="weather-icon" src={iconSrc} size={size} />;
};
