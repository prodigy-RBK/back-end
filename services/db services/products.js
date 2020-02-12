const Product = require("../../models/Product");
const ObjectId = require("mongoose").Types.ObjectId;

const addProduct = productDetails => {
  const product = new Product(productDetails);
  return product.save();
};

const getAll = () => {
  return Product.find()
    .populate("brand")
    .sort({ price: 1 });
};
const getProducts = productsId => {
  return Product.find({ _id: { $in: productsId } });
};

const getOneById = id => {
  return Product.findOne({ _id: id }).populate("brand");
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

const getAllByBrand = brand => {
  return Product.find({ brand });
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

const searchForProducts = (brands, categories, tags, priceRange) => {
  return Product.find({
    brand: { $in: brands },
    category: { $in: categories },
    tags: { $in: tags },
    $and: [
      {
        price: { $lte: parseInt(priceRange[1]) }
      },
      {
        price: { $gte: parseInt(priceRange[0]) }
      }
    ]
  })
    .populate("brand")
    .sort({ price: 1 });
};

const addReview = (productId, review) => {
  return Product.findByIdAndUpdate({ _id: productId }, { $push: { reviews: review } }, { useFindAndModify: false, new: true });
};

const addReply = (productId, reply) => {
  console.log(reply);
  return Product.update(
    { _id: productId, "reviews._id": ObjectId(reply.reviewId) },
    { $push: { "reviews.$.reply": reply } },
    { useFindAndModify: false, new: true }
  );
};

module.exports.getAll = getAll;
module.exports.getTags = getTags;
module.exports.addReply = addReply;
module.exports.addReview = addReview;
module.exports.addProduct = addProduct;
module.exports.getOneById = getOneById;
module.exports.getProducts = getProducts;
module.exports.updateProduct = updateProduct;
module.exports.getCategories = getCategories;
module.exports.deleteProduct = deleteProduct;
module.exports.updateRatings = updateRatings;
module.exports.getAllByGender = getAllByGender;
module.exports.getAllByBrand = getAllByBrand;
module.exports.getByPageNumber = getByPageNumber;
module.exports.numberOfProducts = numberOfProducts;
module.exports.increaseOpinions = increaseOpinions;
module.exports.searchForProducts = searchForProducts;
