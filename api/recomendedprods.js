const behavoirService = require("../services/db services/userbehavoir");
const productsService = require("../services/db services/products");
const express = require("express");
const router = express.Router();
router.get("/getrecommprods", async (req, res) => {
  let userbehavoir = await behavoirService.findBehavoirByuserId("5e43da488bbf4d22e468ba9f");

  let gender = Object.keys(userbehavoir.gender)[0];
  let category = Object.keys(userbehavoir.category)[0];
  let brand = Object.keys(userbehavoir.brand)[0];

  console.log(gender, category, brand);
  let listofrecomendation = await productsService.getProductsbybehavoir(gender, category);
  res.send(listofrecomendation);
});
module.exports = router;
