const Order = require("../../models/order");
const Product = require("../../models/product");
const ObjectId = require("mongodb").ObjectId;

const getAllByUserId = userId => {
  return Order.find({ userId }).populate("products.productId userId");
};

const getOneById = (id, product) => {
  return Order.findOne({ _id: id }).populate("products.productId userId");
};

const createOrder = (userId, orderDetails) => {
  let order = new Order({
    userId,
    products: orderDetails.products,
    paymentMethod: orderDetails.paymentMethod,
    orderPrice: orderDetails.orderPrice,
    deliveryInfo: orderDetails.deliveryInfo,
    paymentMethod: orderDetails.deliveryInfo.payment_method
  });
  return order.save();
};

//not needed anymore
const addProducts = (id, product) => {
  return Order.findByIdAndUpdate({ _id: id }, { $push: { products: product } }, { useFindAndModify: false, new: true }).populate("products.productId userId");
};

const updateProducts = (id, product) => {
  return Order.update(
    { _id: id, "products._id": product._id },
    {
      $set: {
        "products.$.selectedSize": product.selectedSize,
        "products.$.selectedQuantity": product.selectedQuantity,
        "products.$.selectedColor": product.selectedColor,
        "products.$.totalProductPrice": product.totalProductPrice
      }
    },
    { useFindAndModify: false }
  );
};

const deleteProducts = (id, product) => {
  return Order.findByIdAndUpdate({ _id: id }, { $pull: { products: product } }, { useFindAndModify: false, new: true }).populate("products.productId userId");
};

//****************************Dashboard********************* */
const getAdminRevenue = () => {
  return Order.aggregate().group({ _id: null, amount: { $sum: "$orderPrice" } });
};

const getRevenuebyBrand = idBrand => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .match({ "value.brand": idBrand })
    .group({ _id: null, amount: { $sum: "$products.totalProductPrice" }, products: { $push: "$products" } });
};

const numberOfOrders = () => {
  return Order.count({});
};

const getBestSales = () => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value._id", amount: { $sum: "$products.totalProductPrice" }, qte: { $sum: "$products.selectedQuantity" } })
    .sort({ qte: -1 });
};

const geSalesByGender = () => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value.gender", amount: { $sum: "$products.totalProductPrice" }, products: { $push: "$products" } });
};

const getBestSalesByBrand = (nbr = 10) => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value.brand", amount: { $sum: "$products.totalProductPrice" } })
    .sort({ amount: -1 })
    .limit(nbr);
};
/************************************************************** */
module.exports.getOneById = getOneById;
module.exports.createOrder = createOrder;
module.exports.addProducts = addProducts;
module.exports.deleteProducts = deleteProducts;
module.exports.updateProducts = updateProducts;
module.exports.getAllByUserId = getAllByUserId;
module.exports.getAdminRevenue = getAdminRevenue;
module.exports.getRevenuebyBrand = getRevenuebyBrand;
module.exports.numberOfOrders = numberOfOrders;
module.exports.getBestSales = getBestSales;
module.exports.geSalesByGender = geSalesByGender;
module.exports.getBestSalesByBrand = getBestSalesByBrand;
// this.getBestSales().then(t => {
//   console.log(t);
// });
