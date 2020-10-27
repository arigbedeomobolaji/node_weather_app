//jshint esversion:6

//use module
const path = require("path");
const express = require("express");
const hbs = require("hbs");

//Utils modules
const geoCode = require("./utils/geocode");
const weatherForecast = require("./utils/weatherForecast");

//express app
const app = express();

// directories
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../template/views");
const partialsDirectory = path.join(__dirname, "../template/partials");


//Setting up the view engine
//app.set() ==> used to set up some setting in out server and they are very few
app.set("view engine", "hbs");

//setting up the hbs template
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

//Setting up the public files
// app.use() is a way to customize your server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
 //res.render() ==>allows us to render one of our views
 res.render("index", {
  title: "Weather App",
  name: {
   firstname: "Omobolaji",
   lastname: "Arigbede"
  }
 });
});

app.get("/about", (req, res) => {
 res.render("about", {
  title: "About Page",
  name: {
   firstname: "Omobolaji",
   lastname: "Arigbede"
  }
 });
});

app.get("/help", (req, res) => {
 res.render("help", {
  title: "Help Page",
  message: "What's your help request....",
  name: {
   firstname: "Omobolaji",
   lastname: "Arigbede"
  }
 });
});

app.get("/weather", (req, res) => {
 const address = req.query.address;
 if (!address) {
  return res.send({
   error: "Please provide an address",
  });
 }

 geoCode(address, (error, data) => {
  if (error) {
   return res.send({ error });
  }

  weatherForecast(data, (error, weatherData) => {
   if (error) {
    return res.send({
     error: error
    });
   }
   res.send({
    forecast: weatherData,
    location: data.location,
    address: address
   });
  });

 });

});


// 404 page uses *
app.get("/help/*", (req, res) => {
 res.render("404_page", {
  errorMessage: "Help article not found."
 });
});


app.get("*", (req, res) => {
 res.render("404_page", {
  title: "404 page",
  name: {
   firstname: "Omobolaji",
   lastname: "Arigbede"
  },
  errorMessage: "Page not found"
 });
});


app.listen(3000, () => {
 console.log("Server currently listening on port 3000");
});