const brand = require("../services/db services/brands")
const rsponseModel = require("./responseModel")
const bcrypt = require("bcryptjs");
const { createTokens } = require("../middleware/token")

require('../loaders/mongoose')


//****we need to decide if brand can do signup or only the admin can add new barnd   */
var signUp = async request => {
    console.log('request===>', request.body)
    return brand.createBrand(request.body)//request ==> {Brand details}
        .then(async newBrand => {
            //const expire = "20m";
            //const token = jwt.sign({ newBrand }, secretKey, { expiresIn: expire });
            console.log('newBrand===>', newBrand)
            var tokens = await createTokens(newBrand)//tokens is an array of tokens
            const details = new rsponseModel.Details(newBrand.email, { token: tokens[0], refreshToken: tokens[1] });
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
const signIn = async request => {
    // return object if existing user , false if psw or username are wrong
    return brand.findBrand(request.body.email).then(async loginBrand => {
        if (loginBrand) {
            // if user a teacher
            let psw = await bcrypt.compare(request.body.password, loginBrand.password);
            if (psw) {
                var tokens = await createTokens(loginBrand)//tokens is an array of tokens
                const details = new rsponseModel.Details(loginBrand.email, { token: tokens[0], refreshToken: tokens[1] });
                return new rsponseModel.AuthResponse("success", details);
            }//else: ifpsw===false
            return wrongEntryPssword;
        }//else:if loginUser ===null
        return wrongEntryUsername;
    });
};

//response Models
const userExistsResponse = new rsponseModel.AuthResponse("User Already Exists", {});
const serverErrorResponse = new rsponseModel.AuthResponse("Server Side Error", {});
const wrongEntryPssword = new rsponseModel.AuthResponse("wrong password", {});
const wrongEntryUsername = new rsponseModel.AuthResponse("wrong Username", {});

module.exports.signUp = signUp;
module.exports.signIn = signIn;