const fashionService = require("../services/fashion api/fashion");

const fetchArticles = async () => {
  try {
    let latestArticles = await fashionService.getLatestThreeArticles();
    return { latestArticles: JSON.parse(latestArticles) };
  } catch (err) {
    return { err };
  }
};

module.exports.fetchArticles = fetchArticles;
