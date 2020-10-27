const request = require("request");

const weatherForecast = ({ latitude, longitude } = {}, callback) => {
 const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=9b07bd28a3610efc9f3a15cd321732d4" + "&units=metric";
 request({ url, json: true }, (error, {body} = {}) => {
  if (error) {
   callback("Unable to connect to the Weather Forecast service Provider. Check Network Connectivity", undefined);
  } else if (body.message) {
   callback("Nothing to geocode, Please check Latitude and Longitude", undefined);
  } else {
   callback(undefined, body);
  }
 });
}

module.exports = weatherForecast;