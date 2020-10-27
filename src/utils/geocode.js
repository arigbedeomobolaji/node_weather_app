//jshint esversion:6
const request = require("request");

const geoCode = (address, callback) => {
 const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=sk.eyJ1IjoiYXJpZ2JlZGVvbW9ib2xhamkiLCJhIjoiY2tnaWczdXB5MDRpMDJwb3phN21iMm9yNSJ9.8-aJ87KiYHcU9eVmPds8zQ&fuzzyMatch=false&limit=1";

 request({ url, json: true }, (error, {body} = {} ) => {
  if (error) {
   callback("Unable to connect to the Geocoding Service Provider. Check Network Connectivity", undefined);
  } else if (body.features.length === 0) {
   callback("Location not found, Please enter another location", undefined);
  } else {
   callback(undefined, {
    latitude: body.features[0].center[1],
    longitude: body.features[0].center[0],
    location: body.features[0].place_name
   });
  }
 });
}

module.exports = geoCode;