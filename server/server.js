const express = require("express");
require("dotenv").config();
console.log(process.env);
const fetch = require("node-fetch");
const path = require("path");
const bodyParser = require("body-parser");
const { faCity } = require("@fortawesome/free-solid-svg-icons");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3000; //port for deploy or localhost
//let authUrl = "https://www.strava.com/oauth/token";

const app = express();

//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/gettokenfromcode", function (req, res) {
  let codeString = JSON.stringify(req.body, null, 2);
  let codeObject = JSON.parse(codeString);
  //console.log('Got code:', codeObject);
  let data = authWithCode(codeObject.code).then((auth) => res.send(auth));
});

app.post("/api/refreshtoken", function (req, res) {
  let bodyString = JSON.stringify(req.body, null, 2);
  let bodyObject = JSON.parse(bodyString);
  //console.log('Got refresh_token:', bodyObject);
  let data = authWithRefreshToken(bodyObject.refresh_token).then((auth) =>
    res.send(auth)
  );
});

app.post("/api/getaddress", function (req, res) {
  let codeString = JSON.stringify(req.body, null, 2);
  let codeObject = JSON.parse(codeString);
  //console.log('Got code:', codeObject);
  let data = fetchFromDadata(codeObject.latlng).then((address) =>
    res.send(address)
  );
});
app.post("/api/getaddressfrommapbox", function (req, res) {
  let codeString = JSON.stringify(req.body, null, 2);
  let codeObject = JSON.parse(codeString);
  // console.log('Got code:', codeObject);
  let data = fetchFromMapBox(codeObject.latlng).then((address) =>
    res.send(address)
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

async function authWithRefreshToken(token) {
  let authUrl = "https://www.strava.com/oauth/token";
  let a = await fetch(authUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: token,
      grant_type: "refresh_token",
    }),
  }).then((res) => res.json());
  //console.log(a);
  return a;
}

async function authWithCode(code) {
  let authUrl = "https://www.strava.com/oauth/token";
  let a = await fetch(authUrl, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
    }),
  }).then((res) => res.json());
  //console.log('authWithCode: ', a);
  return a;
}

async function fetchFromMapBox(
  latlng,
  access_token = process.env.MAPBOX_ACCESS_TOKEN
) {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${latlng[1]},${latlng[0]}.json?access_token=${access_token}`;

  let data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  let addr = "";
  let filteredData = data.features.filter((d) => d.id.includes("locality"));
  if (filteredData.length !== 0) return filteredData[0].place_name;

  return data.features[0].place_name;
}

async function fetchFromDadata(latlng, access_token) {
  var url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
  var token = process.env.DADATA_TOKEN;
  var query = { lat: latlng[0], lon: latlng[1] };

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify(query),
  };

  let data = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  // console.log(data.suggestions);
  if (data.suggestions.length == 0) return "";
  ({ city, street_with_type } = data.suggestions[0].data);
  if (city == null && street_with_type == 0) return "";
  if (street_with_type == null) return city;
  if (city == null) return street_with_type;
  return city + ", " + street_with_type;
}

app.listen(PORT, function () {
  console.log(`App started at port ${PORT}`);
});
