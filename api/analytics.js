const express = require("express");
const router = express.Router();
const ga = require("google-analyticsreporting");
var key = require("../aerobic-orbit-267414-37423e3c90ba.json");
let csvToJson = require("convert-csv-to-json");
const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const reportRequests = {
  reportRequests: [
    {
      viewId: "210229493",
      dateRanges: [
        {
          endDate: "yesterday",
          startDate: "30daysAgo"
        }
      ],
      metrics: [
        {
          expression: "ga:totalEvents"
        }
      ],
      dimensions: [
        {
          name: "ga:eventCategory"
        },
        {
          name: "ga:eventAction"
        },
        {
          name: "ga:eventLabel"
        }
      ]
    }
  ]
};
router.get("/eventall", async (req, res) => {
  ga.auth(key).then(
    ga.query(reportRequests).then(function(error, results) {
      var csv = ga.makecsv(error, results);
      console.log(csv);
      const csvWriter = createCsvWriter({
        path: "out.csv"
      });
      csvWriter.writeRecords(csv).then(() => console.log("The CSV file was written successfully"));

      /* let json = csvToJson.getJsonFromCsv("out.csv");
      console.log(json);*/
    })
  );
});

module.exports = router;
