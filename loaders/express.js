const express = require("express");
const cors = require("cors");
const productsRouter = require("../api/products");
const user = require("../api/user");
const ordersRouter = require("../api/orders");
const upload = require("../middleware/milter");

module.exports = async app => {
  app.use(cors());
  app.use(express.json());
  app.use("/api/products", productsRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/user", user);
  app.post("/api/multer", upload.array("myFiles", 12), (req, res) => {
    console.log(req.body);
    res.send(req.files);
  });
};
