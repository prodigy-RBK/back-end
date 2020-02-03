const productsService = require("../services/db services/products");
const ObjectId = require("mongoose").Types.ObjectId;

const updateRating = async (id, rating) => {
  let product = await productsService.getOneById(id);
  let oldRating = product.rating;
  let nbrOfOpinions = product.opinions;
  let newRating = (oldRating * nbrOfOpinions + rating) / (nbrOfOpinions + 1);
  return productsService.updateRatings(id, newRating);
};

const searchForProducts = (brands, categories, tags, priceRange) => {
  fixedBrandsId = brands.map(elm => ObjectId(elm));
  return productsService.searchForProducts(fixedBrandsId, categories, tags, priceRange);
};

module.exports.updateRating = updateRating;
module.exports.searchForProducts = searchForProducts;
