const brand = require("../services/db services/brands");
const rsponseModel = require("./responseModel");
const bcrypt = require("bcryptjs");
const { createTokens, createConfirmationTokens } = require("../middleware/token");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const { sendMailBrand } = require("../middleware/mailer");

require("../loaders/mongoose");

//****we need to decide if brand can do signup or only the admin can add new barnd   */
var signUp = async request => {
  const pendingImage = await cloudinary.uploader.upload(path.resolve(__dirname, "../uploads/", request.files[0].filename));
  const image = pendingImage.secure_url;
  return brand
    .createBrand(request.body, image) //request ==> {Brand details}
    .then(async newBrand => {
      // var tokens = await createTokens(newBrand); //tokens is an array of tokens
      // await sendMail(newBrand.email, token);
      const details = new rsponseModel.Details(newBrand.email, {});
      return new rsponseModel.AuthResponse("success", details);
    })
    .catch(err => {
      if (err.code === 11000) {
        return userExistsResponse;
      }
      return serverErrorResponse;
    });
};
/*************************************************************************** */
const signIn = async (request, res) => {
  // return object if existing user , false if psw or username are wrong
  return brand.findBrand(request.body.email).then(async loginBrand => {
    if (loginBrand) {
      // if user a teacher
      let psw = await bcrypt.compare(request.body.password, loginBrand.password);
      if (psw) {
        var tokens = await createTokens(loginBrand); //tokens is an array of tokens
        const details = new rsponseModel.Details({ email: loginBrand.email, type: loginBrand.type }, { token: tokens[0], refreshToken: tokens[1] });
        res.set("x-token", tokens[0]);
        res.set("x-refresh-token", tokens[1]);
        return new rsponseModel.AuthResponse("success", details);
      } //else: ifpsw===false
      return wrongEntryPssword;
    } //else:if loginUser ===null
    return wrongEntryUsername;
  });
};

const sendEmailRegistrationBrand = async email => {
  console.log("---->", email);
  var token = await createConfirmationTokens(email);
  var result = await sendMailBrand(email, token);
  if (result) {
    const details = new rsponseModel.Details(email, {});
    return new rsponseModel.AuthResponse("success", details);
  } else {
    return serverErrorResponse;
  }
};
//response Models
const userExistsResponse = new rsponseModel.AuthResponse("Brand Already Exists", {});
const serverErrorResponse = new rsponseModel.AuthResponse("Server Side Error", {});
const wrongEntryPssword = new rsponseModel.AuthResponse("wrong password", {});
const wrongEntryUsername = new rsponseModel.AuthResponse("wrong Username", {});

module.exports.signUp = signUp;
module.exports.signIn = signIn;
module.exports.sendEmailRegistrationBrand = sendEmailRegistrationBrand;
