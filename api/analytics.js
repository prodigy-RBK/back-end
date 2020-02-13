const express = require("express");
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

router.get("/eventall", async (req, res) => {
  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    "start-date": "30daysAgo",
    "end-date": "today",
    metrics: ["ga:totalEvents"],
    dimensions: ["ga:eventCategory,ga:eventAction,ga:eventLabel"]
  });
  console.log(result.data.rows);
});

var j = schedule.scheduleJob("05 * * * *", function() {
  console.log("The answer to life, the universe, and everything!");
});
module.exports = router;
