const Brand = require("../../models/brand");
const bcrypt = require("bcryptjs");

const addBrand = (brandDetails, image) => {
  const brand = new Brand({
    name: brandDetails.name,
    email: brandDetails.email,
    image
  });
  return brand.save();
};

const getAllBrands = () => {
  return Brand.find();
};

const createBrand = async (brandDetails, image) => {
  //Brand is an  object contain all necessary data :firstname,password..
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(brandDetails.password, salt);
  let newBrand = new Brand({
    name: brandDetails.name,
    email: brandDetails.email,
    password: hashedPassword,
    image
  });
  return newBrand.save();
};

const findBrand = email => {
  return Brand.findOne({ email });
};

const findBrandById = id => {
  return Brand.findById(id);
};

const UpdateDate = () => {
  return Brand.findOneAndUpdate({ email }, { UpdatedAt: Date.now });
};

const addProduct = (id, productId) => {
  return Brand.findOneAndUpdate({ _id: id }, { $push: { products: productId } }, { useFindAndModify: false, new: true });
};

module.exports.addBrand = addBrand;
module.exports.findBrand = findBrand;
module.exports.addProduct = addProduct;
module.exports.UpdateDate = UpdateDate;
module.exports.createBrand = createBrand;
module.exports.getAllBrands = getAllBrands;
module.exports.findBrandById = findBrandById;
