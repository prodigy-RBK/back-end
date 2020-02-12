const Userbehavoir = require("../../models/userbehavoir");

const addUserBehavoir = behavoir => {
  const userbeahav = new Userbehavoir(behavoir);
  return userbeahav.save();
};

const findBehavoirByuserId = userid => {
  return Userbehavoir.findOne(userid);
};
const UpdateuserBehavoir = userid => {
  return Userbehavoir.findOneAndUpdate({ userid }, {});
};

module.exports.addUserBehavoir = addUserBehavoir;
module.exports.findBehavoirByuserId = findBehavoirByuserId;
module.exports.UpdateuserBehavoir = UpdateuserBehavoir;
