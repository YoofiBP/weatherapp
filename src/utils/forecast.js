
require("dotenv").config();
const axios = require("axios");

const forecast = async (long, lat) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_APIKEY}`;

  options = {
    url,
    json: true,
    params: {
      query: `${lat},${long}`
    },
  };

  const response = await axios(options);
  return response.data;
};

module.exports = forecast;
