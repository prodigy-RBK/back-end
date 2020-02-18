const router = require("express").Router();
const brandOperations = require("../operations/brands");
const brandService = require("../services/db services/brands");
const { verifyRefreshTokensBrand } = require("../middleware/token");
const upload = require("../middleware/multer");

router.post("/signUp", upload.array("image", 12), async (req, res) => {
  try {
    const brand = await brandOperations.signUp(req);
    res.status(201).json(brand);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const response = await brandOperations.signIn(req, res);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/one", verifyRefreshTokensBrand, async (req, res) => {
  try {
    let brands = await brandService.findBrandById(req.user._id);
    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verifytoken", verifyRefreshTokensBrand, (req, res) => {
  res.send({ authed: true, idbrand: req.user._id });
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
