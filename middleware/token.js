const jwt = require("jsonwebtoken");
const { AuthResponse } = require('../operations/responseModel');
const { secretKey, secretKey2 } = require("../config/index");
const user = require("../services/db services/users")
const { OAuth2Client } = require('google-auth-library');
const request = require("request");
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
  const info = jwt.decode(token);

  if (info.iss === 'accounts.google.com') {
    try {
      const client = new OAuth2Client();
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6ZmFsc2UsImhhc09yZGVyZWQiOmZhbHNlLCJfaWQiOiI1ZTM3MGFiMWI3YmM0ODE0YzAzZmQ3Y2IiLCJmaXJzdE5hbWUiOiJNIiwibGFzdE5hbWUiOiJGIiwiZW1haWwiOiJNRk1FSERJM0BHTUFJTC5DT00iLCJwYXNzd29yZCI6IiQyYSQxMCQ2VExBQzM1dllNdEZvVDlXQS5xcmZPZHR3TldIQjA1VC5VbkZVU21ja1ZBMFBUSzZCTnhzMiIsImNyZWF0aW9uRGF0ZSI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIlVwZGF0ZWRBdCI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIl9fdiI6MH0sImlhdCI6MTU4MDY2NTU0MCwiZXhwIjoxNTgwNjY1NjAwfQ.7bRGGH6TQpmfZY8wegFmVN--pRHBJXUI1KAegFzC9Yo",
        });
        const payload = ticket.getPayload();
        console.log("*-*-*-*--*-*-*-*-*->", payload)
      }
      verify()
      next()
    }
    catch{
      res.status(401).send(invalidToken);
      return
    }
  } else {
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

const confirmationSocial = async (req, res, next) => {

  try {
    // var t = await jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6ZmFsc2UsImhhc09yZGVyZWQiOmZhbHNlLCJfaWQiOiI1ZTM3MGFiMWI3YmM0ODE0YzAzZmQ3Y2IiLCJmaXJzdE5hbWUiOiJNIiwibGFzdE5hbWUiOiJGIiwiZW1haWwiOiJNRk1FSERJM0BHTUFJTC5DT00iLCJwYXNzd29yZCI6IiQyYSQxMCQ2VExBQzM1dllNdEZvVDlXQS5xcmZPZHR3TldIQjA1VC5VbkZVU21ja1ZBMFBUSzZCTnhzMiIsImNyZWF0aW9uRGF0ZSI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIlVwZGF0ZWRBdCI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIl9fdiI6MH0sImlhdCI6MTU4MDY2NTU0MCwiZXhwIjoxNTgwNjY1NjAwfQ.7bRGGH6TQpmfZY8wegFmVN--pRHBJXUI1KAegFzC9Yo")
    const userInfo = jwt.decode(req.body.token)
    console.log(userInfo)
    if (userInfo.iss === "accounts.google.com") {
      req.userInfo = userInfo
      next()
    }
  } catch (err) {
    console.log(err)
    res.status(401).send(invalidToken);
    return
  }
}
const confirmationSocialFacebook = async (req, res, next) => {
  console.log("token---->", req.body.email)
  var options = {
    method: 'GET',
    // url: `https://graph.facebook.com/debug_token?input_token=${req.body.token}`,
    url: `https://graph.facebook.com/debug_token?input_token=${req.body.token}`,
    qs: {
      access_token: "2678136558938821|b1c2335581efb2fbf39b0904a0d2a120"
    },
    headers: {
      'content-type': 'application/json'
    }
  };
  try {
    // var t = await jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6ZmFsc2UsImhhc09yZGVyZWQiOmZhbHNlLCJfaWQiOiI1ZTM3MGFiMWI3YmM0ODE0YzAzZmQ3Y2IiLCJmaXJzdE5hbWUiOiJNIiwibGFzdE5hbWUiOiJGIiwiZW1haWwiOiJNRk1FSERJM0BHTUFJTC5DT00iLCJwYXNzd29yZCI6IiQyYSQxMCQ2VExBQzM1dllNdEZvVDlXQS5xcmZPZHR3TldIQjA1VC5VbkZVU21ja1ZBMFBUSzZCTnhzMiIsImNyZWF0aW9uRGF0ZSI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIlVwZGF0ZWRBdCI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIl9fdiI6MH0sImlhdCI6MTU4MDY2NTU0MCwiZXhwIjoxNTgwNjY1NjAwfQ.7bRGGH6TQpmfZY8wegFmVN--pRHBJXUI1KAegFzC9Yo")
    request(options, function (error, response) {
      //console.log(JSON.parse(response.body).data)
      var userInfo = JSON.parse(response.body).data
      // console.log(userInfo)
      if (userInfo.is_valid) {
        var options2 = {
          method: 'GET',
          url: `https://graph.facebook.com/v5.0/${userInfo.user_id}?fields=first_name,last_name,email`,
          qs: {
            access_token: "2678136558938821|b1c2335581efb2fbf39b0904a0d2a120"
          },
          headers: {
            'content-type': 'application/json'
          }
        };
        request(options2, (err, resp) => {
          var userInfo = JSON.parse(resp.body)
          userInfo.email = req.body.email
          console.log("--->", userInfo)
          req.userInfo = userInfo
          next()
        })

      } else {
        res.status(401).send(invalidToken);
        return
      }
    })

  } catch (err) {
    console.log(err)
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
module.exports.confirmationSocial = confirmationSocial
module.exports.confirmationSocialFacebook = confirmationSocialFacebook


