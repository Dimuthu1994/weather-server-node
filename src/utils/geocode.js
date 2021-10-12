const axios = require("axios");
const geocode = async (address, callback) => {
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?limit=2&access_token=pk.eyJ1IjoiMTk4MzcwZSIsImEiOiJja3Rza2M0OXgxaDJmMnhwbWQwcTM3d3Q5In0.T-C7WJ8u8JGc3nxn_usb-Q";
  try {
    const resp = await axios.get(url2);
    callback(
      {
        latitude: resp.data.features[0].center[1],
        longitude: resp.data.features[0].center[0],
        location: resp.data.features[0].place_name,
      },
      undefined
    );
  } catch (error) {
    callback(undefined, error);
  }
};

module.exports = geocode;
