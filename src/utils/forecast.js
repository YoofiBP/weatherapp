const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_APIKEY}`;

  options = {
    url,
    json: true,
    qs: {
      query: `${lat},${long}`,
    },
  };

  request(options, callback);
};

module.exports = forecast;
