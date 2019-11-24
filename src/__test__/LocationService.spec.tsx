import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getGeolocation } from "Services/location";
import config from "config";

describe("Location Service", () => {
  describe("getGeolocation", () => {
    test("should get geoLocation data correctly", async () => {
      const getSpy = jest.spyOn(axios, "get");
      const place = 'sw'
      const mockUrl = `${config.MAPBOX_SEARCH_PLACES_API}/${place}.json?access_token=${config.MAPBOX_TOKEN}`;
      const mockResp = { response: { data: true } };
      const axiosMockAdapter = new MockAdapter(axios);

      axiosMockAdapter.onGet(mockUrl).reply(200, mockResp);

      const geoLocation = await getGeolocation(place);
      expect(getSpy).toBeCalled();

      expect(geoLocation).toEqual(mockResp);

      axiosMockAdapter.reset();
      axiosMockAdapter.restore();
    });
  });
});
