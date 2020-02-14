const behavoirService = require("../services/db services/userbehavoir");
const productsService = require("../services/db services/products");
const express = require("express");
const router = express.Router();
function buildquery(object) {
  var max = 0;
  var mostkey = "";
  for (var key in object) {
    if (max < object[key]) {
      max = object[key];
      mostkey = key;
    }
  }
  return mostkey;
}
router.get("/getrecommprods", async (req, res) => {
  let userbehavoir = await behavoirService.findBehavoirByuserId(req.query.userid + "1");

  if (userbehavoir !== null) {
    let gender = buildquery(userbehavoir.gender);
    let category = buildquery(userbehavoir.category);
    let brand = buildquery(userbehavoir.brand);

    let listofrecomendation = await productsService.getProductsbybehavoir(gender, category, brand);

    listofrecomendation.sort(x => {
      if (x["brand"]["name"] === brand) {
        return -1;
      } else {
        return 0;
      }
    });

    res.send(listofrecomendation);
  }
  res.send("noid");
});
module.exports = router;
