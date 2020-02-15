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

const bestSales = async (id, productDetails) => {
  var products = await ordersService.getBestSales();
  var obj = {};
  products[0].products.forEach(product => {
    if (obj[product.productId] !== undefined) {
      obj[product.productId] = obj[product.productId] + product.selectedQuantity;
    } else {
      obj[product.productId] = product.selectedQuantity;
    }
  });
  return Object.keys(obj).sort(function(a, b) {
    return obj[b] - obj[a];
  });
  console.log(keysSorted);
};

module.exports.addToCart = addToCart;
module.exports.createOrder = createOrder;
module.exports.bestSales = bestSales;
