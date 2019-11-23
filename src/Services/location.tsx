import axios from "axios";
import Logger from "js-logger";

import config from "../config";

const getGeolocation = async (place: string) => {
  try {
    const urlPath = `${config.MAPBOX_SEARCH_PLACES_API}/${place}.json?access_token=${config.MAPBOX_TOKEN}`;
    const { data } = await axios.get(urlPath);
    return data;
  } catch (error) {
    Logger.error(error);
  }
};

export { getGeolocation };
