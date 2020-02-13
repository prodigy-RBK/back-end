const router = require("express").Router();
const ordersService = require("../services/db services/orders");
const orderOperations = require("../operations/orders");
const { verifyRefreshTokens } = require("../middleware/token");

router.get("/user", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await ordersService.getAllByUserId(req.user._id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await ordersService.getOneById(req.params.id, req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/order", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await orderOperations.createOrder(req.user._id, req.body);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id/products", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await ordersService.updateProducts(req.params.id, req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id/products", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await ordersService.deleteProducts(req.params.id, req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
