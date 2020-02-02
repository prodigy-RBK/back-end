const ordersService = require("../services/db services/orders");

const addToCart = async (id, product) => {
  let order = await ordersService.getOneById(id);
};

module.exports.addToCart = addToCart;
