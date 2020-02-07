const user = require("../services/db services/users");
const rsponseModel = require("./responseModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretKey, secretKey2 } = require("../config/index");
const { createTokens, createConfirmationTokens } = require("../middleware/token");
const { sendMail } = require("../middleware/mailer");

require("../loaders/mongoose");

var signUp = async request => {
  // console.log('request===>', request.body)
  return user
    .createUser(request.body) //request ==> {user details}
    .then(async newUser => {
      var token = await createConfirmationTokens(newUser);
      // var tokens = await createTokens(newUser);//tokens is an array of tokens
      var emai = await sendMail(newUser.email, token);

      const details = new rsponseModel.Details(newUser.email, {});

      //const details = new rsponseModel.Details(newUser.email, { token: tokens[0], refreshToken: tokens[1] });
      return new rsponseModel.AuthResponse("success", details);
    })
    .catch(err => {
      if (err.code === 11000) {
        return userExistsResponse;
      }
      return serverErrorResponse;
    });
};

const signIn = async (request, res) => {
  // return object if existing user , false if psw or username are wrong
  return user.findUser(request.body.email).then(async loginUser => {
    if (loginUser) {
      let psw = await bcrypt.compare(request.body.password, loginUser.password);
      if (psw) {
        var tokens = await createTokens(loginUser); //tokens is an array of tokens
        if (!loginUser.isActive) {
          var token = await createConfirmationTokens(loginUser);
          // var tokens = await createTokens(newUser);//tokens is an array of tokens
          sendMail(loginUser.email, token);
        }
        const details = new rsponseModel.Details(loginUser.email, { token: tokens[0], refreshToken: tokens[1] }, loginUser.isActive);
        res.set("x-token", tokens[0]);
        res.set("x-refresh-token", tokens[1]);
        return new rsponseModel.AuthResponse("success", details);
      } //else: ifpsw===false
      return wrongEntryPssword;
    } //else:if loginUser ===null
    return wrongEntryUsername;
  });
};

const confirmation = async email => {
  try {
    return user.UpdateToActive(email);
  } catch (err) {
    console.log("rrrrr");
  }
};

const addUserInfoSocial = request => {
  return user
    .createUser(request)
    .then(newUser => {
      const details = new rsponseModel.Details(newUser.email, {});
      return new rsponseModel.AuthResponse("success", details);
    })
    .catch(err => {
      return serverErrorResponse;
    });
};

const verificationEmail = async email => {
  var response = await user.findUser(email);
  return response ? true : false;
};

//response Models
const invalidToken = new rsponseModel.AuthResponse("Invalid Token", {});
const userExistsResponse = new rsponseModel.AuthResponse("User Already Exists", {});
const serverErrorResponse = new rsponseModel.AuthResponse("Server Side Error", {});
const wrongEntryPssword = new rsponseModel.AuthResponse("wrong password", {});
const wrongEntryUsername = new rsponseModel.AuthResponse("wrong Username", {});

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.confirmation = confirmation;
module.exports.verificationEmail = verificationEmail;
module.exports.addUserInfoSocial = addUserInfoSocial;
