const productsService = require("../services/db services/products");
const brandsService = require("../services/db services/brands");
const ObjectId = require("mongoose").Types.ObjectId;
const cloudinary = require("cloudinary").v2;
const path = require("path");

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

const addProduct = async (id, productDetails, originalImages) => {
  const pendingImages = await originalImages.map(async image => {
    return await cloudinary.uploader.upload(path.resolve(__dirname, "../uploads/", image.filename));
  });
  const images = await Promise.all(pendingImages);
  const finalImages = images.map(image => image.secure_url);
  productDetails.images = finalImages;
  productDetails.brand = id;
  productDetails.availability = JSON.parse(productDetails.availability);
  let product = await productsService.addProduct(productDetails);
  await brandsService.addProduct(id, product._id);
  return product;
};

module.exports.addProduct = addProduct;
module.exports.getProducts = getProducts;
module.exports.updateRating = updateRating;
module.exports.searchForProducts = searchForProducts;
