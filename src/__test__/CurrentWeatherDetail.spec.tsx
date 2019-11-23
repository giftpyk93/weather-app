import React from "react";
import { create } from "react-test-renderer";
import CurrentWeatherDetail from "Components/CurrentWeatherDetail";

const mockWeatherDetail = [
  {
    label: "Humidity",
    value: "56%",
  },
  {
    label: "Wind",
    value: "15 meter/sec",
  },
  {
    label: "Pressure",
    value: "110 hPa",
  },
];

describe("CurrentWeatherDetail component", () => {
  test("Matches the snapshot", () => {
    const renderer = create(<CurrentWeatherDetail weatherDetails={mockWeatherDetail} />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
