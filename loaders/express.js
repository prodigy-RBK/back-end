const express = require("express");
const cors = require("cors");
const productsRouter = require("../api/products");
const user = require("../api/user");

module.exports = async app => {
  app.use(cors());
  app.use(express.json());
  app.use("/api/products", productsRouter);
  app.use("/user", user);
};
