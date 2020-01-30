const express = require("express");
const cors = require("cors");
const productsRouter = require("../api/products");
const user = require("../api/user");
const ordersRouter = require("../api/orders");
const upload = require("../middleware/milter");
const brand = require("../api/brand");

module.exports = async app => {
  app.use(cors());
  app.use(express.json());
  app.use("/api/products", productsRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/user", user);
  app.post("/api/multer", upload.array("myFiles", 12), (req, res) => {
    res.send(req.files);
  });
  app.use("/api/user", user);
  app.use("/api/brand", brand);
};
