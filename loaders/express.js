const express = require("express");
const cors = require("cors");
const user = require("../api/user")

module.exports = async app => {
  app.use(cors());
  app.use(express.json());
  app.use("/user", user);
};
