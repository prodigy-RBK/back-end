const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const productSchema = mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
    required: true
  },
  price: {
    required: true,
    type: Number
  },
  rating: {
    type: Number,
    default: 0
  },
  opinions: {
    type: Number,
    default: 0
  },
  images: {
    required: true,
    type: [
      {
        type: String,
        default: "https://gear.nitro.com/content/images/thumbs/default-image_600.png"
      }
    ]
  },
  availability: {
    type: [
      {
        size: String,
        color: String,
        quantity: Number
      }
    ]
  },
  tags: {
    type: [String]
  },
  category: {
    type: String
  },
  gender: {
    type: String
  }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
