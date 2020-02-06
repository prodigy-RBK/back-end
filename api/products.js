const router = require("express").Router();
const productsService = require("../services/db services/products");
const productsOperation = require("../operations/products");
const { verifyRefreshTokens } = require("../middleware/token");

router.get("/allproducts", async (req, res) => {
  try {
    let products = await productsService.getAll();
    //  var user = req.user
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/categories/:gender", async (req, res) => {
  let gender = req.params.gender || "Men";
  try {
    let categories = await productsService.getCategories(gender);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/brands/:gender", async (req, res) => {
  let gender = req.params.gender || "Men";
  try {
    let categories = await productsService.getBrands(gender);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/tags/:gender", async (req, res) => {
  let gender = req.params.gender || "Men";
  try {
    let tags = await productsService.getTags(gender);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/search", async (req, res) => {
  try {
    const { brands, categories, tags, priceRange } = req.body;
    let products = await productsOperation.searchForProducts(brands, categories, tags, priceRange);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/page/:id", async (req, res) => {
  try {
    let products = await productsService.getByPageNumber(req.params.id);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/gender/:id", async (req, res) => {
  try {
    let products = await productsService.getAllByGender(req.params.id);
    res.status(200).send(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/product", async (req, res) => {
  try {
    let product = await productsService.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/rating", async (req, res) => {
  try {
    let updatedProduct = await productsOperation.updateRating(req.params.id, req.body.rating);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let updatedProduct = await productsService.updateProduct(req.params.id, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let product = await productsService.getOneById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let product = await productsService.deleteProduct(req.params.id);
    res.status(204).send(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
