require("dotenv").config();
const axios = require("axios");

const generateGPS = async (address) => {
  if (!address) {
    console.log("Please provide an address");
    return;
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json`;

  options = {
    url,
    method: "get",
    params: {
      limit: 1,
      access_token: process.env.MAPBOX_TOKEN,
    },
  };

  const response = await axios(options);
  return response.data;
};

module.exports = generateGPS;
