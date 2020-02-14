const express = require("express");
const cors = require("cors");
const productsRouter = require("../api/products");
const user = require("../api/user");
const ordersRouter = require("../api/orders");
const upload = require("../middleware/multer");
const brand = require("../api/brand");
const path = require("path");
const charge = require("../middleware/stripe");
const analyticsRouter = require("../api/analytics");
const fashionApi = require("../api/fashion");

module.exports = async app => {
  //app.use(cors());
  app.use(
    cors({
      exposedHeaders: ["Content-Length", "x-token", "x-refresh-token"]
    })
  );
  app.use(express.json());
  app.use("/api/user", user);
  app.use("/api/brand", brand);
  app.use("/api/orders", ordersRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/articles", fashionApi);
  app.post("/api/multer", upload.array("image", 12), (req, res) => {
    res.send(req.files);
  });
  app.get("/uploads/:id", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../uploads/", req.params.id));
  });
  app.use("/api/stripe", charge);
};
