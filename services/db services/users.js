const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const createUser = async user => {  //user is an  object contain all necessary data :firstname,password..
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    let newUser = new User(user);
    return newUser.save()

};

const findUser = email => {
    return User.findOne({ email });
};

const findUserById = id => {
    return User.findById(id);
};

const UpdateToActive = async email => {
    return await User.findOneAndUpdate({ email }, { isActive: true }, {
        new: true,
        useFindAndModify: false

    });
};

const UpdateDate = () => {
    return User.findOneAndUpdate({ email }, { UpdatedAt: Date.now });
};

module.exports.createUser = createUser;
module.exports.findUser = findUser;
module.exports.UpdateToActive = UpdateToActive;
module.exports.UpdateDate = UpdateDate;
module.exports.findUserById = findUserById;

// this.createUser({
//     firstName: 'mehdi',
//     lastname: 'farjallah',
//     email: 'mfmehdi2@gmail.com',
//     password: '123456',
//     userType: "customer",
// })