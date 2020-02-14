const Userbehavoir = require("../../models/userbehavoir");

const addUserBehavoir = behavoir => {
  const userbeahav = new Userbehavoir(behavoir);
  return userbeahav.save();
};

const findBehavoirByuserId = userid => {
  return Userbehavoir.findOne({ id: userid });
};

const updatebehavoir = (id, userb) => {
  console.log(id, userb, Userbehavoir);
  return Userbehavoir.findByIdAndUpdate(id, { $set: { gender: userb.gender, category: userb.category, brand: userb.brand } });
};
module.exports.updatebehavoir = updatebehavoir;
module.exports.addUserBehavoir = addUserBehavoir;
module.exports.findBehavoirByuserId = findBehavoirByuserId;
