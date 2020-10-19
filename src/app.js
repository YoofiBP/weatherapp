const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
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
    title: "Weather App by Yoofi",
    heading: "Weather",
    name: "Yoofi",
  });
});

app.get("/weather", async (req, res) => {
  let longitude, latitude;

  try {
    if (req.query.latitude && req.query.longitude) {
      latitude = req.query.latitude;
      longitude = req.query.longitude;
    } else {
      if (!req.query.address) {
        return res.send({ error: "Please provide a search term" });
      }
      const { features } = await generateGPS(req.query.address);
      [longitude, latitude] = features[0].center;
    }

    const { current, location } = await forecast(longitude, latitude);
    const [weather] = current.weather_descriptions;
    const { name, region, country } = location;
    res.send({ name, region, country, weather });
  } catch (err) {
    console.log(err);
  }
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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
