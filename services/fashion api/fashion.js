const request = require("request");

const getFiveMostPopularArticles = () => {
  const promise = new Promise((resolve, reject) => {
    request(
      "https://newsapi.org/v2/everything?q=fashion&apiKey=f85cc7f4c3d545539dcc36823289228a&language=en&sortBy=popularity&pageSize=5",
      (error, response, body) => {
        if (error) return reject(error);
        return resolve(body);
      }
    );
  });
  return promise;
};

const getLatestThreeArticles = () => {
  const promise = new Promise((resolve, reject) => {
    request(
      "https://newsapi.org/v2/everything?q=fashion&apiKey=f85cc7f4c3d545539dcc36823289228a&language=en&sortBy=publishedAt&pageSize=3",
      (error, response, body) => {
        if (error) return reject(err);
        return resolve(body);
      }
    );
  });
  return promise;
};

module.exports.getLatestThreeArticles = getLatestThreeArticles;
module.exports.getFiveMostPopularArticles = getFiveMostPopularArticles;
