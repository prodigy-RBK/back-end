const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  userType: {
    required: true,
    type: String,
    default: "customer"
  },
  isActive: {
    required: true,
    type: Boolean,
    default: false
  },
  hasOrdered: {
    required: true,
    type: Boolean,
    default: false
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  UpdatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
