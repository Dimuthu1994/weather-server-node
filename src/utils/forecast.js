const axios = require("axios");
const forecast = async (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=a9a569e6fe963046946327b320214390&query=" +
    latitude +
    "," +
    longitude;
  try {
    const resp = await axios.get(url);
    callback(
      `It is currently ${resp.data.current.temperature} degrees out.It feel like ${resp.data.current.feelslike} degree out`,
      undefined
    );
  } catch (error) {
    callback(undefined, error);
  }
};

module.exports = forecast;
