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

export type CurrentWeatherType = {
  main: CurrentWeatherMainType;
  weather: CurrentWeatherWeatherType[];
  wind: CurrentWeatherWindType;
};

type HourlyWeatherWeatherType = { icon: string };

type HourlyWeatherMainType = {
  temp: number;
};

export type HourlyWeatherType = {
  dt: number;
  dt_txt: string;
  main: HourlyWeatherMainType;
  weather: HourlyWeatherWeatherType[];
};
