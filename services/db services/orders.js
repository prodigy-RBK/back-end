const Order = require("../../models/Order");

const getAllByUserId = userId => {
  return Order.find({ userId }).populate("products.productId userId");
};

const getOneById = (id, product) => {
  return Order.findOne({
    _id: id,
    products: product
  });
};

const createOrder = orderDetails => {
  let order = new Order(orderDetails);
  return order.save().populate("products.productId userId");
};

//not needed anymore
const addProducts = (id, product) => {
  return Order.findByIdAndUpdate(
    { _id: id },
    { $push: { products: product } },
    { useFindAndModify: false, new: true }
  ).populate("products.productId userId");
};

const deleteProducts = (id, product) => {
  return Order.findByIdAndUpdate(
    { _id: id },
    { $pull: { products: product } },
    { useFindAndModify: false, new: true }
  ).populate("products.productId userId");
};

module.exports.getOneById = getOneById;
module.exports.createOrder = createOrder;
module.exports.addProducts = addProducts;
module.exports.deleteProducts = deleteProducts;
module.exports.getAllByUserId = getAllByUserId;
