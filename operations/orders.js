const ordersService = require("../services/db services/orders");

const addToCart = async (id, product) => {
  let order = await ordersService.getOneById(id);
};

const createOrder = async (id, productDetails) => {
  let order = await ordersService.createOrder(req.user._id, req.body);
};

module.exports.addToCart = addToCart;
