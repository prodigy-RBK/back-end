const router = require("express").Router();
const productsService = require("../services/db services/products");

router.get("/:id", async (req, res) => {
  let product = await productsService.getOneById(req.params.id);
  res.send(product);
});

module.exports = router;
