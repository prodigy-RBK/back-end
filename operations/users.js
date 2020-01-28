const user = require("../services/db services/users")
const rsponseModel = require("./responseModel")
//const jwt = require("./node_modules/jsonwebtoken");
const bcrypt = require("bcryptjs");

const { createTokens } = require("../middleware/token")
require('../loaders/mongoose')


var signUp = async request => {
    console.log('request===>', request)
    return user.createUser(request.body)//request ==> {user details}
        .then(async newUser => {
            //const expire = "20m";
            //const token = jwt.sign({ newUser }, secretKey, { expiresIn: expire });
            var tokens = await createTokens(newUser)//tokens is an array of tokens
            const details = new rsponseModel.Details(newUser.email, { token: tokens[0], refreshToken: tokens[1] });
            return new rsponseModel.AuthResponse("success", details);
        })
        .catch(err => {
            if (err.code === 11000) {
                return userExistsResponse;
            }
            return serverErrorResponse;
        });
};

const signIn = async request => {
    // return object if existing user , false if psw or username are wrong
    return user.findUser(request.body.email).then(async loginUser => {
        if (loginUser) {
            // if user a teacher
            let psw = await bcrypt.compare(request.body.password, loginUser.password);

            if (psw) {
                var tokens = await createTokens(loginUser)//tokens is an array of tokens
                const details = new rsponseModel.Details(loginUser.email, { token: tokens[0], refreshToken: tokens[1] });
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