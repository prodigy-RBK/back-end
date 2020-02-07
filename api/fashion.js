const router = require("express").Router();
const fashionService = require("../services/fashion api/fashion");

router.get("/", async (req, res) => {
  try {
    let articles = await fashionService.getFiveMostPopularArticles();
    res.status(200).json(JSON.parse(articles));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
