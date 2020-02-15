const router = require("express").Router();
const productsService = require("../services/db services/products");
const productsOperation = require("../operations/products");
const { verifyRefreshTokens, verifyRefreshTokensBrand } = require("../middleware/token");
const upload = require("../middleware/multer");
const cloudinary = require("cloudinary").v2;

router.get("/allproducts", async (req, res) => {
  try {
    let products = await productsService.getAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/allproducts", async (req, res) => {
  try {
    let products = await productsService.getProducts(req.body.products);
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

router.get("/brand/:brandId", async (req, res) => {
  let brandId = req.params.brandId;
  try {
    let products = await productsService.getAllByBrand(brandId);
    res.status(200).json(products);
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

router.post("/product", upload.array("images", 12), verifyRefreshTokensBrand, async (req, res) => {
  try {
    let product = await productsOperation.addProduct(req.user._id, req.body, req.files);
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

router.put("/:id/review", async (req, res) => {
  try {
    let updatedProduct = await productsService.addReview(req.params.id, req.body.review, req.user);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/mostRated", async (req, res) => {
  try {
    let product = await productsService.getTopRating();
    res.status(200).send(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/:id/availability", async (req, res) => {
  try {
    const { size, color, quantity } = req.body;
    let updatedProduct = await productsService.changeQuantity(req.params.id, size, color, quantity);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id/availability", async (req, res) => {
  try {
    const { size, color } = req.body;
    let updatedProduct = await productsService.deleteAvailability(req.params.id, size, color);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id/reply", async (req, res) => {
  try {
    let updatedProduct = await productsService.addReply(req.params.id, req.body);
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
