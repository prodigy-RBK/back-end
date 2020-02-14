const mongoose = require("mongoose");

const userbehaviorSchema = mongoose.Schema({
  id: {
    unique: true,
    required: true,
    type: String
  },
  gender: {
    required: true,
    type: Object
  },
  category: {
    required: true,
    type: Object
  },
  brand: {
    type: Object
  }
});

module.exports = mongoose.model("userbehavior", userbehaviorSchema);
