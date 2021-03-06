const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;
// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// custom directory to views
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "Dimuthu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dimuthu",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Dimuthu",
    title: "Help",
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide a address",
    });

  geocode(req.query.address, (data, error) => {
    if (error) return res.send({ error });

    forecast(data.latitude, data.longitude, (forecastData, error) => {
      if (error) return res.send(error);

      res.send({
        forecast: forecastData,
        location: data.location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You must provide a search term",
    });
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "Coudnt Find",
  });
});

// to start server up
app.listen(port, () => {
  console.log("server is up on port " + port);
});
