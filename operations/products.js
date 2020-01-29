const productsService = require("../services/db services/products");

const updateRating = async (id, rating) => {
  let product = await productsService.getOneById(id);
  let oldRating = product.rating;
  let nbrOfOpinions = product.opinions;
  let newRating = (oldRating * nbrOfOpinions + rating) / (nbrOfOpinions + 1);
  return productsService.updateRatings(id, newRating);
};

module.exports.updateRating = updateRating;
