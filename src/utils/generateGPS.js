const request = require("request");
require("dotenv").config();

const generateGPS = (address, callback) => {
  if (!address) {
    console.log("Please provide an address");
    return;
  }
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json`;

  options = {
    url,
    json: true,
    qs: {
      limit: 1,
      access_token: process.env.MAPBOX_TOKEN,
    },
  };

  request(options, callback);
};

module.exports = generateGPS;
