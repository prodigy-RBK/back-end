const Product = require("../../models/Product");

const addProduct = productDetails => {
  const product = new Product(productDetails);
  return product.save();
};

const getAll = () => {
  return Product.find();
};

const getOneById = id => {
  return Product.findOne({ _id: id });
};

const deleteProduct = id => {
  return Product.findOneAndRemove({ _id: id }, { useFindAndModify: false });
};

//not needed anymore
const increaseOpinions = id => {
  return Product.findOneAndUpdate({ _id: id }, { $inc: { opinions: 1 } }, { useFindAndModify: false });
};

const updateRatings = (id, rating) => {
  return Product.findOneAndUpdate({ _id: id }, { rating, $inc: { opinions: 1 } }, { useFindAndModify: false, new: true });
};

const updateProduct = (id, productDetails) => {
  return Product.findOneAndUpdate({ _id: id }, productDetails, {
    useFindAndModify: false,
    new: true
  });
};

const numberOfProducts = () => {
  return Product.countDocuments({});
};

const getAllByGender = gender => {
  return Product.find({ gender });
};

const getByPageNumber = page => {
  return Product.paginate({}, { page, limit: 9 });
};

const getCategories = gender => {
  return Product.distinct("category", { gender });
};

const getTags = gender => {
  return Product.distinct("tags", { gender });
};

module.exports.getAll = getAll;
module.exports.getTags = getTags;
module.exports.addProduct = addProduct;
module.exports.getOneById = getOneById;
module.exports.updateProduct = updateProduct;
module.exports.getCategories = getCategories;
module.exports.deleteProduct = deleteProduct;
module.exports.updateRatings = updateRatings;
module.exports.getAllByGender = getAllByGender;
module.exports.getByPageNumber = getByPageNumber;
module.exports.numberOfProducts = numberOfProducts;
module.exports.increaseOpinions = increaseOpinions;
