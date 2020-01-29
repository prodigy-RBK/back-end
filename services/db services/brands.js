const Brand = require("../../models/brand");
const bcrypt = require("bcryptjs");

const addBrand = brandDetails => {
  const brand = new Brand(brandDetails);
  return brand.save();
};

const getAllBrands = () => {
  return Brand.find();
};

const createBrand = async brand => {  //Brand is an  object contain all necessary data :firstname,password..
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(brand.password, salt);
  brand.password = hashedPassword;
  let newBrand = new Brand(brand);
  return newBrand.save()

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



module.exports.createBrand = createBrand;
module.exports.findBrand = findBrand;
module.exports.UpdateDate = UpdateDate;
module.exports.findBrandById = findBrandById;

module.exports.addBrand = addBrand;
module.exports.getAllBrands = getAllBrands;
