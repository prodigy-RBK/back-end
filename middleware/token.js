const jwt = require("jsonwebtoken");
const { AuthResponse } = require('../operations/responseModel');
const { secretKey, secretKey2 } = require("../config/index");
const user = require("../services/db services/users")

// let verifyToken = (req, res, next) => {
//   const token = req.headers["token"];
//   if (!token) return res.status(401).send(invalidToken);

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.status(401).send(invalidToken);//in this part we need to refresh token
//     console.log(user)
//     req.user = user;
//     next();
//   });
// };

let createTokens = async (user) => {
  const createToken = jwt.sign({ user }, secretKey, { expiresIn: '30m' });

  const createRefreshToken = jwt.sign({ user }, secretKey2 + user.password, { expiresIn: '7d' });

  return Promise.all([createToken, createRefreshToken]);
};


let refreshTokens = async (req, res, next) => {
  var refreshToken = req.headers["x-refresh-token"]
  var token = req.headers["x-token"]

  let userId = -1;
  if (token) {
    try {
      const { user } = jwt.verify(token, secretKey)
      req.user = user;
      next();
    } catch (err) {
      try {
        const { user: { id } } = jwt.decode(refreshToken);
        userId = id;
      } catch (err) {
        return res.status(401).send(invalidToken);
      }

      if (!userId) {
        return res.status(401).send(invalidToken);
      }
      const findUser = await user.findUserById(userId)
      if (!findUser) {
        return res.status(401).send(invalidToken);
      }

      const refreshSecret = secretKey2 + findUser.password;

      try {
        jwt.verify(refreshToken, refreshSecret);
      } catch (err) {
        return res.status(401).send(invalidToken);
      }

      const [newToken, newRefreshToken] = await createTokens(findUser);
      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user,
      };

    }
  }
}

const invalidToken = new AuthResponse("Invalid Token", {});

//module.exports = verifyToken;
module.exports.createTokens = createTokens
module.exports.refreshTokens = refreshTokens
