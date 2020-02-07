const router = require("express").Router();
const fashionOperation = require("../operations/fashion");

router.get("/", async (req, res) => {
  let articles = await fashionOperation.fetchArticles();
  if (articles.err) return res.status(500).send(articles);
  res.status(200).json(articles);
});

module.exports = router;
