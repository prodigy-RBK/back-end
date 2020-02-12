const mongoose = require("mongoose");

const userbehaviorSchema = mongoose.Schema({
  userid: {
    required: true,
    type: String
  },
  gender: {
    unique: true,
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
