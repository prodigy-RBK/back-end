const router = require("express").Router();
const brandOperations = require("../operations/brands");
const brandService = require("../services/db services/brands");

router.post("/signUp", (req, res) => {
  brandOperations.signUp(req).then(response => {
    res.send(response);
  });
});

router.post("/signIn", (req, res) => {
  brandOperations.signIn(req).then(response => {
    res.send(response);
  });
});

router.get("/", async (req, res) => {
  try {
    let brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
