const express = require("express");
const loaders = require("./loaders");
const { port } = require("./config/index");
// const populate = require("./operations/populateDb");

const app = express();
loaders(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});

// app.get("/populatebrands", (req, res) => {
//   populate.populateFakeBrands();
//   res.send("ee");
// });
// app.get("/populateproducts", (req, res) => {
//   populate.populateFakeProducts();
//   res.send("ee");
// });
