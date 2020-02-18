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
  return Order.countDocuments({});
};

const getBestSales = () => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value", amount: { $sum: "$products.totalProductPrice" }, qte: { $sum: "$products.selectedQuantity" } })
    .lookup({ from: "brands", localField: "_id.brand", foreignField: "_id", as: "_id.brand" })
    .unwind("_id.brand")
    .project({ "_id.brand.password": 0 })
    .sort({ qte: -1 })
    .limit(10);
};

const getSalesByGender = () => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value.gender", amount: { $sum: "$products.totalProductPrice" }, products: { $push: "$products" } })
    .sort({ amount: -1 });
};

const getSaleBrandByGender = idBrand => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .match({ "value.brand": idBrand })
    .group({ _id: "$value.gender", amount: { $sum: "$products.totalProductPrice" }, products: { $push: "$products" } })
    .sort({ amount: -1 });
};
const getBestSalesByBrandAdmin = (nbr = 10) => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .group({ _id: "$value.brand", amount: { $sum: "$products.totalProductPrice" }, qte: { $sum: "$products.selectedQuantity" } })
    .sort({ qte: -1 })
    .limit(10);
};

const getAdminRevenueByDays = () => {
  return Order.aggregate()
    .group({ _id: { $dateToString: { format: "%Y-%m-%d", date: "$creationDate" } }, amount: { $sum: "$orderPrice" } })
    .sort({ _id: -1 })
    .limit(7);
};
const getBestSalesByBrand = (idbrand, nbr = 10) => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .match({ "value.brand": idbrand })
    .group({ _id: "$value", amount: { $sum: "$products.totalProductPrice" }, qte: { $sum: "$products.selectedQuantity" } })
    .lookup({ from: "brands", localField: "_id.brand", foreignField: "_id", as: "_id.brand" })
    .unwind("_id.brand")
    .project({ "_id.brand.password": 0 })
    .sort({ qte: -1 })
    .limit(10);
};
const getBrandRevenueByDays = idbrand => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .match({ "value.brand": idbrand })
    .group({ _id: { $dateToString: { format: "%Y-%m-%d", date: "$creationDate" } }, amount: { $sum: "$orderPrice" } })
    .sort({ _id: -1 })
    .limit(7);
};

const getNbProductSoldByBrand = idbrand => {
  return Order.aggregate()
    .unwind("products")
    .lookup({ from: "products", localField: "products.productId", foreignField: "_id", as: "value" })
    .unwind("value")
    .match({ "value.brand": idbrand })
    .group({ _id: null, qte: { $sum: "$products.selectedQuantity" } });
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
module.exports.getSalesByGender = getSalesByGender;
module.exports.getBestSalesByBrand = getBestSalesByBrand;
module.exports.getBestSalesByBrandAdmin = getBestSalesByBrandAdmin;
module.exports.getAdminRevenueByDays = getAdminRevenueByDays;
module.exports.getBrandRevenueByDays = getBrandRevenueByDays;
module.exports.getSaleBrandByGender = getSaleBrandByGender;
module.exports.getNbProductSoldByBrand = getNbProductSoldByBrand;
