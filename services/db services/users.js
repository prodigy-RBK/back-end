const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;

const createUser = async user => {
  //user is an  object contain all necessary data :firstname,password..
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  let newUser = new User(user);
  return newUser.save();
};

const findUser = email => {
  return User.findOne({ email });
};

const findUserById = id => {
  return User.findById({ _id: id });
};

const UpdateToActive = async email => {
  return await User.findOneAndUpdate(
    { email },
    { isActive: true },
    {
      new: true,
      useFindAndModify: false
    }
  );
};
const updatePassword = async (_id, newPassword) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  return User.findOneAndUpdate(
    { _id },
    { password: hashedPassword },
    {
      new: true,
      useFindAndModify: false
    }
  );
};

const UpdateDate = () => {
  return User.findOneAndUpdate({ email }, { UpdatedAt: Date.now });
};

const getWishlist = id => {
  return User.findOne({ _id: id });
};

const addToWishlist = (id, product) => {
  return User.findByIdAndUpdate({ _id: id }, { $push: { wishlist: product } }, { useFindAndModify: false, new: true });
};

const removeFromWishlist = (id, product) => {
  return User.findByIdAndUpdate({ _id: id }, { $pull: { wishlist: ObjectId(product) } }, { useFindAndModify: false, new: true });
};

//****************************Dashboard********************* */
const numberOfUser = async () => {
  return await User.count({}, { useFindAndModify: false });
};

const numberOfNewUser = async nbOfDays => {
  var date = new Date();
  date.setDate(date.getDate() - nbOfDays);
  return await User.count({ creationDate: { $gte: date } });
};
module.exports.findUser = findUser;
module.exports.UpdateDate = UpdateDate;
module.exports.createUser = createUser;
module.exports.getWishlist = getWishlist;
module.exports.findUserById = findUserById;
module.exports.addToWishlist = addToWishlist;
module.exports.UpdateToActive = UpdateToActive;
module.exports.removeFromWishlist = removeFromWishlist;
module.exports.updatePassword = updatePassword;
module.r = exports.numberOfUser = numberOfUser;
module.exports.numberOfNewUser = numberOfNewUser;
