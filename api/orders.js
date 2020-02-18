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

router.get("/revenue", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getAdminRevenue();
    res.status(200).json(revenue[0].amount);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/revenueDaily", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getAdminRevenueByDays();
    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/revenueBrandDaily", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getBrandRevenueByDays(ObjectId(req.user._id));

    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/revenuebyBrand", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getRevenuebyBrand(ObjectId(req.user._id));
    console.log(revenue);
    res.status(200).json(revenue[0].amount);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/salesbyGender", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getSalesByGender();
    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/salesBrandbyGender", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let revenue = await ordersService.getSaleBrandByGender(ObjectId(req.user._id));
    res.status(200).json(revenue);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bestSalesByBrand", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let bestSales = await ordersService.getBestSalesByBrandAdmin();
    res.status(200).json(bestSales);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/bestSalesproductsByBrand", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let bestSales = await ordersService.getBestSalesByBrand(ObjectId(req.user._id), 5);
    res.status(200).json(bestSales);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/numberOfOrders", async (req, res) => {
  try {
    let revenue = await ordersService.numberOfOrders();
    res.status(200).json(revenue);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/bestSales", async (req, res) => {
  try {
    let products = await ordersService.getBestSales();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/order", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await orderOperations.createOrder(req.user._id, req.body);
    res.status(201).json(order);
  } catch (err) {
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

router.get("/:id", verifyRefreshTokens, async (req, res) => {
  try {
    let order = await ordersService.getOneById(req.params.id, req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
