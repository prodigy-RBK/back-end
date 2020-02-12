const ordersService = require("../services/db services/orders");
const productService = require("../services/db services/products");
const addToCart = async (id, product) => {
  let order = await ordersService.getOneById(id);
};

const createOrder = async (id, productDetails) => {
  productDetails.products.forEach(async product => {
    const { productId, selectedSize, selectedColor, selectedQuantity } = product;
    await productService.decreaseQuantity(productId, selectedSize, selectedColor, -1 * selectedQuantity);
  });
  let order = await ordersService.createOrder(id, productDetails);
  return order;
};

module.exports.addToCart = addToCart;
module.exports.createOrder = createOrder;
