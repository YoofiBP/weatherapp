const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const generateGPS = require("./utils/generateGPS");
const forecast = require("./utils/forecast");

const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yoofi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide a search term" });
  }
  generateGPS(req.query.address, (err, gpsResponse, { features = [] } = {}) => {
    if (err) {
      return res.send({ err });
    } else if (features.length === 0) {
      return res.send({ error: "Sorry, we found no matching records" });
    }
    const [longitude, latitude] = features[0].center;
    forecast(
      longitude,
      latitude,
      (err, forecastResponse, { current = {}, location = {} } = {}) => {
        if (err) {
          return res.send({ err });
        } else if (location.name === null) {
          return res.send({ error: "Invalid address" });
        }
        const [weather] = current.weather_descriptions;
        const { name, region, country } = location;
        res.send({ name, region, country, weather });
      }
    );
  });
});

app.get("/products", (req, res) => {
  res.json(req.query);
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Yoofi" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Yoofi" });
});

app.get("/help/*", (req, res) => {
  res.render("help", { title: "Random", name: "Andrew" });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page Not found",
    name: "Yoofi",
    errorMessage:
      "Looks like you are looking for something that does not exist",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
