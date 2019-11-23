import React from "react";
import { create } from "react-test-renderer";
import CurrentWeatherTemperature from "Components/CurrentWeatherTemperature";

const mockCurrentWeatherTemperatureProp = {
  currentTemp: 27.48,
  iconCode: "d10",
  place: "Queensland, Australia",
  maxTemp: 27.48,
  minTemp: 27.48,
  weatherStatus: "Clear",
};

describe("CurrentWeatherTemperature component", () => {
  test("Matches the snapshot", () => {
    const renderer = create(<CurrentWeatherTemperature {...mockCurrentWeatherTemperatureProp} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
