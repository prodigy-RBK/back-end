const productsService = require("../services/db services/products");
const brandsService = require("../services/db services/brands");
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

const getProducts = productsId => {
  fixedProductsId = productsId.map(elm => ObjectId(elm));
  return productsService.getProducts(fixedProductsId);
};

const addProduct = async (id, productDetails) => {
  let product = await productsService.addProduct(productDetails);
  await brandsService.addProduct(id, product._id);
  return product;
};

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.updateRating = updateRating;
module.exports.searchForProducts = searchForProducts;
