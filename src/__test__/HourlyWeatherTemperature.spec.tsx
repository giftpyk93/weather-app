import React from "react";
import { create } from "react-test-renderer";
import HourlyWeatherTemperature from "Components/HourlyWeatherTemperature";

const mockHourlyWeather = [
  {
    dt: 23613424234,
    dt_txt: "23/11/2019 22:59:01",
    main: {
      temp: 25.8,
    },
    weather: [
      {
        icon: "d10",
      },
    ],
  },
];

describe("HourlyWeatherTemperature component", () => {
  test("Matches the snapshot", () => {
    const renderer = create(<HourlyWeatherTemperature hourlyWeather={mockHourlyWeather} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
