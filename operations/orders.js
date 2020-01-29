const ordersService = require("../services/db services/orders");

const addToCart = async (id, product) => {
  let order = await ordersService.getOneById(id);
  if (product.productId === order.productId) {
    console.lo;
  }
};

module.exports.addToCart = addToCart;
