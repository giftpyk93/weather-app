import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getCurrenWeather, getHourlyWeather } from "Services/weather";
import config from "config";

const lat = 13;
const lng = 5;

describe("Weather Service", () => {
  describe("getCurrenWeather", () => {
    test("should get current weather data correctly", async () => {
      const getSpy = jest.spyOn(axios, "get");
      const mockUrl = `${config.OPEN_WEATHER_BASE_API}/weather?lat=${lat}&lon=${lng}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`;
      const mockResp = { response: { data: true } };
      const axiosMockAdapter = new MockAdapter(axios);

      axiosMockAdapter.onGet(mockUrl).reply(200, mockResp);

      const currenWeather = await getCurrenWeather({ lat, lng });
      expect(getSpy).toBeCalled();

      expect(currenWeather).toEqual(mockResp);

      axiosMockAdapter.reset();
      axiosMockAdapter.restore();
    });
  });

  describe("getHourlyWeather", () => {
    test("should get hourly weather data correctly", async () => {
      const getSpy = jest.spyOn(axios, "get");
      const mockUrl = `${config.OPEN_WEATHER_BASE_API}/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${config.OPEN_WEATHER_API_KEY}`;
      const mockResp = {
        list: true,
      };
      const axiosMockAdapter = new MockAdapter(axios);

      axiosMockAdapter.onGet(mockUrl).reply(200, mockResp);

      const hourlyWeather = await getHourlyWeather({ lat, lng });
      expect(getSpy).toBeCalled();

      expect(hourlyWeather).toEqual(mockResp.list);

      axiosMockAdapter.reset();
      axiosMockAdapter.restore();
    });
  });
});
