const router = require("express").Router();
const brandOperations = require("../operations/brands");
const brandService = require("../services/db services/brands");
const { verifyRefreshTokensBrand } = require("../middleware/token");

router.post("/signUp", (req, res) => {
  brandOperations.signUp(req).then(response => {
    res.send(response);
  });
});

router.post("/signIn", (req, res) => {
  brandOperations.signIn(req, res).then(response => {
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

router.get("/one", verifyRefreshTokensBrand, async (req, res) => {
  try {
    console.log(req.user._id);
    let brands = await brandService.findBrandById(req.user._id);
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verifytoken", verifyRefreshTokensBrand, (req, res) => {
  res.send({ authed: true, idbrand: req.user._id });
});
module.exports = router;
