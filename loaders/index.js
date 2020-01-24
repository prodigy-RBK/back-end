const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

module.exports = async app => {
  await expressLoader(app);
  console.log("Express Intialized...");
  mongooseLoader.on("error", function() {
    console.log("mongoose connection error");
  });
  mongooseLoader.once("open", function() {
    console.log("mongoose connected successfully");
  });
};
