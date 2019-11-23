import dotenv from 'dotenv'

dotenv.config()

const config = {
  MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN,
  MAPBOX_SEARCH_PLACES_API: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
};

export default config;
