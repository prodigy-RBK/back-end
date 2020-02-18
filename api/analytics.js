const express = require("express");
const label = require("./Labelling");
const productsService = require("../services/db services/products");
const router = express.Router();

var key = require("../aerobic-orbit-267414-37423e3c90ba.json");

var schedule = require("node-schedule");

const { google } = require("googleapis");

const analytics = google.analytics("v3");
const clientEmail = key.client_email;
const privateKey = key.private_key;
const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
const viewId = "211325839";
const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes
});
function getmostviews(array) {
  var object = {};
  for (var i = 1; i < array.length; i++) {
    object[array[i][0].split("/")[1]] = array[i][1];
  }
  return object;
}
var j = schedule.scheduleJob("00 00 12 * * 0-6", async function() {
  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    "start-date": "yesterday",
    "end-date": "today",
    metrics: ["ga:totalEvents"],
    dimensions: ["ga:eventCategory,ga:eventAction,ga:eventLabel"]
  });
  console.log("automatic update of users behavoir");
  label.update(result.data.rows);
});
router.get("/pageview", async (req, res) => {
  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    "start-date": "yesterday",
    "end-date": "today",
    metrics: ["ga:totalEvents"],
    dimensions: ["ga:pagePath"]
  });

  var endresult = await getmostviews(result.data.rows);

  async function mostviewed(object) {
    var array = [];
    for (var key in object) {
      let product = await productsService.getOneById(key);

      array.push(product);
    }

    return array;
  }
  var arraytosend = await mostviewed(endresult);

  res.send(arraytosend);
});

module.exports = router;
