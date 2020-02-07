const fashionService = require("../services/fashion api/fashion");

const fetchArticles = async () => {
  try {
    let latestArticles = await fashionService.getLatestThreeArticles();
    let popularArticles = await fashionService.getFiveMostPopularArticles();
    return { latestArticles: JSON.parse(latestArticles), popularArticles: JSON.parse(popularArticles) };
  } catch (err) {
    return { err };
  }
};

module.exports.fetchArticles = fetchArticles;
