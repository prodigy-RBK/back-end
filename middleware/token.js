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
  const createToken = jwt.sign({ user }, secretKey, { expiresIn: '1m' });

  const createRefreshToken = jwt.sign({ user }, secretKey2 + user.password, { expiresIn: '2m' });

  return Promise.all([createToken, createRefreshToken]);
};

let createConfirmationTokens = async (user) => {
  return jwt.sign({ user }, secretKey, { expiresIn: '24h' });
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
        const { user: { _id } } = jwt.decode(refreshToken);
        userId = _id;
      } catch (err) {
        res.status(401).send(invalidToken);
        return
      }

      if (!userId) {
        res.status(401).send(invalidToken);
      }
      const findUser = await user.findUserById(userId)
      if (!findUser) {
        res.status(401).send(invalidToken);
        return
      }

      const refreshSecret = secretKey2 + findUser.password;

      try {
        jwt.verify(refreshToken, refreshSecret);
      } catch (err) {
        res.status(401).send(invalidToken);
        return
      }

      const [newToken, newRefreshToken] = await createTokens(findUser);
      //console.log('newwwww===>', newToken, '\n', newRefreshToken)
      req.tokens = {
        token: newToken,
        refreshToken: newRefreshToken
      };
      next();

    }
  }
}


const confirmation = async (req, res, next) => {
  try {
    const { user } = jwt.verify(req.params.token, secretKey)
    req.user = user
    next()
    // var update = user.UpdateToActive(resp.user.email)
  } catch (err) {
    res.status(401).send(invalidToken);
    return
  }

}


const invalidToken = new AuthResponse("Invalid Token", {});

//module.exports = verifyToken;
module.exports.createTokens = createTokens
module.exports.refreshTokens = refreshTokens
module.exports.confirmation = confirmation
module.exports.createConfirmationTokens = createConfirmationTokens
