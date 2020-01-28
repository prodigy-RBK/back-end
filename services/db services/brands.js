const Brand = require("../../models/brand");

const addBrand = brandDetails => {
  const brand = new Brand(brandDetails);
  return brand.save();
};

const getAllBrands = () => {
  return Brand.find();
};

module.exports.addBrand = addBrand;
module.exports.getAllBrands = getAllBrands;
