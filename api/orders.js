const router = require("express").Router();
const ordersService = require("../services/db services/orders");
const orderOperations = require("../operations/orders");
const { verifyRefreshTokens, verifyRefreshTokensBrand } = require("../middleware/token");
const ObjectId = require("mongodb").ObjectId;

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
//****************************Dashboard********************* */
router.get("/revenue", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getAdminRevenue();
    res.status(200).json(revenue[0].amount);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/revenuebyBrand", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getRevenuebyBrand(ObjectId(req.body.id));
    res.status(200).send(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/nuberOfOrders", async (req, res) => {
  try {
    let revenue = await ordersService.numberOfOrders();
    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bestSales", async (req, res) => {
  try {
    let products = await orderOperations.bestSales();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
