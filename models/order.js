const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: {
    required: true,
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        selectedSize: String,
        selectedQuantity: Number,
        selectedColor: String,
        totalProductPrice: Number
      }
    ]
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  paymentMethod: String,
  orderStatus: {
    type: String,
    default: "pending"
  },
  orderPrice: Number,
  deliveryInfo: {
    street1: String,
    street2: String,
    city: String,
    zip: Number,
    country: String,
    phone_number: Number
  }
});

module.exports = mongoose.model("Order", orderSchema);
