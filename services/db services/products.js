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

const increaseOpinions = id => {
  return Product.findOneAndUpdate(
    { _id: id },
    { $inc: { opinions: 1 } },
    { useFindAndModify: false }
  );
};

const updateRatings = (id, rating) => {
  return Product.findOneAndUpdate(
    { _id: id },
    { rating, $inc: { opinions: 1 } },
    { useFindAndModify: false }
  );
};

const getAllByGender = gender => {
  return Product.find({ gender });
};

module.exports.getAll = getAll;
module.exports.addProduct = addProduct;
module.exports.getOneById = getOneById;
module.exports.deleteProduct = deleteProduct;
module.exports.updateRatings = updateRatings;
module.exports.getAllByGender = getAllByGender;
module.exports.increaseOpinions = increaseOpinions;
