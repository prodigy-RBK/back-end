const jwt = require("jsonwebtoken");
const { AuthResponse } = require("../operations/responseModel");
const { secretKey, secretKey2 } = require("../config/index");
const user = require("../services/db services/users");
const { OAuth2Client } = require("google-auth-library");
const request = require("request");

let createTokens = async user => {
  const createToken = jwt.sign({ user }, secretKey, { expiresIn: "1h" });
  const createRefreshToken = jwt.sign({ user }, secretKey2 + user.password, { expiresIn: "7d" });

  return Promise.all([createToken, createRefreshToken]);
};

let createConfirmationTokens = async user => {
  return jwt.sign({ user }, secretKey, { expiresIn: "24h" });
};

let verifyRefreshTokens = async (req, res, next) => {
  var refreshToken = req.headers["x-refresh-token"];
  var token = req.headers["x-token"];
  const info = jwt.decode(token);
  if (info) {
    if (info.iss === "accounts.google.com") {
      try {
        const client = new OAuth2Client();
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: token
            //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6ZmFsc2UsImhhc09yZGVyZWQiOmZhbHNlLCJfaWQiOiI1ZTM3MGFiMWI3YmM0ODE0YzAzZmQ3Y2IiLCJmaXJzdE5hbWUiOiJNIiwibGFzdE5hbWUiOiJGIiwiZW1haWwiOiJNRk1FSERJM0BHTUFJTC5DT00iLCJwYXNzd29yZCI6IiQyYSQxMCQ2VExBQzM1dllNdEZvVDlXQS5xcmZPZHR3TldIQjA1VC5VbkZVU21ja1ZBMFBUSzZCTnhzMiIsImNyZWF0aW9uRGF0ZSI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIlVwZGF0ZWRBdCI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIl9fdiI6MH0sImlhdCI6MTU4MDY2NTU0MCwiZXhwIjoxNTgwNjY1NjAwfQ.7bRGGH6TQpmfZY8wegFmVN--pRHBJXUI1KAegFzC9Yo",
          });
          const payload = ticket.getPayload();
          console.log("payload===>", payload);
          const findUser = await user.findUser(payload.email);
          req.user = { firstName: payload.given_name, lastName: payload.family_name, _id: findUser._id };
        }
        await verify();
        next();
      } catch {
        res.status(401).send(invalidToken);
        return;
      }
    } else {
      let userId = -1;
      // if (token) {
      // console.log('---->', jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6dHJ1ZSwiaGFzT3JkZXJlZCI6ZmFsc2UsIl9pZCI6IjVlM2FkMDNiMDNiYTYwMWRkMDg0ZGI3MyIsImZpcnN0TmFtZSI6Im1laGRpIiwibGFzdE5hbWUiOiJjdmJuaiwiLCJlbWFpbCI6Im1mbWVoZGkyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEYzYXd2NU1sQUZCamY0R01Pb0tVMmV1c2UySVdUUFZEdmo4T2U3MWlIZk1WbkYyZ0NCeHg2IiwiY3JlYXRpb25EYXRlIjoiMjAyMC0wMi0wNVQxNDoyNDo1OS4zMzdaIiwiVXBkYXRlZEF0IjoiMjAyMC0wMi0wNVQxNDoyNDo1OS4zMzdaIiwiX192IjowfSwiaWF0IjoxNTgwOTE1Njc2LCJleHAiOjE1ODA5MTY4NzZ9.RUxQ3gmIM8l9SWmy3wB86DnMQv9hwJjsKIUaRsP3grg', secretKey))
      try {
        const data = jwt.verify(token, secretKey);
        const { firstName, lastName, _id } = data.user;
        req.user = {
          firstName,
          lastName,
          _id
        };

        next();
      } catch (err) {
        try {
          const {
            user: { _id }
          } = jwt.decode(refreshToken);
          userId = _id;
        } catch (err) {
          res.status(401).send(invalidToken);
          return;
        }

        if (!userId) {
          res.status(401).send(invalidToken);
        }
        const findUser = await user.findUserById(userId);
        if (!findUser) {
          res.status(401).send(invalidToken);
          return;
        }

        const refreshSecret = secretKey2 + findUser.password;

        try {
          jwt.verify(refreshToken, refreshSecret);
        } catch (err) {
          res.status(401).send(invalidToken);
          return;
        }

        const [newToken, newRefreshToken] = await createTokens(findUser);

        res.set("x-token", newToken);
        res.set("x-refresh-token", newRefreshToken);
        const { firstName, lastName, _id } = findUser;
        req.user = {
          firstName,
          lastName,
          _id
        };
        next();
      }
      //}
    }
  } else {
    confirmationSocialFacebook(req, res, next);
  }
};

const confirmation = async (req, res, next) => {
  try {
    const { user } = jwt.verify(req.params.token, secretKey);
    req.user = user;
    next();
    // var update = user.UpdateToActive(resp.user.email)
  } catch (err) {
    res.status(401).send(invalidToken);
    return;
  }
};

const confirmationSocial = async (req, res, next) => {
  try {
    // var t = await jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpc0FjdGl2ZSI6ZmFsc2UsImhhc09yZGVyZWQiOmZhbHNlLCJfaWQiOiI1ZTM3MGFiMWI3YmM0ODE0YzAzZmQ3Y2IiLCJmaXJzdE5hbWUiOiJNIiwibGFzdE5hbWUiOiJGIiwiZW1haWwiOiJNRk1FSERJM0BHTUFJTC5DT00iLCJwYXNzd29yZCI6IiQyYSQxMCQ2VExBQzM1dllNdEZvVDlXQS5xcmZPZHR3TldIQjA1VC5VbkZVU21ja1ZBMFBUSzZCTnhzMiIsImNyZWF0aW9uRGF0ZSI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIlVwZGF0ZWRBdCI6IjIwMjAtMDItMDJUMTc6NDU6MjEuMDYxWiIsIl9fdiI6MH0sImlhdCI6MTU4MDY2NTU0MCwiZXhwIjoxNTgwNjY1NjAwfQ.7bRGGH6TQpmfZY8wegFmVN--pRHBJXUI1KAegFzC9Yo")
    const userInfo = jwt.decode(req.body.token);
    if (userInfo.iss === "accounts.google.com") {
      req.userInfo = userInfo;
      //res.set("x-token", req.body.token);
      next();
    }
  } catch (err) {
    res.status(401).send(invalidToken);
    return;
  }
};

const confirmationSocialFacebook = async (req, res, next) => {
  var options = {
    method: "GET",
    // url: `https://graph.facebook.com/debug_token?input_token=${req.body.token}`,
    url: `https://graph.facebook.com/debug_token?input_token=${req.body.token}`,
    qs: {
      access_token: "2678136558938821|b1c2335581efb2fbf39b0904a0d2a120"
    },
    headers: {
      "content-type": "application/json"
    }
  };
  try {
    request(options, function(error, response) {
      var userInfo = JSON.parse(response.body).data;
      if (userInfo.is_valid) {
        var options2 = {
          method: "GET",
          url: `https://graph.facebook.com/v5.0/${userInfo.user_id}?fields=first_name,last_name,email`,
          qs: {
            access_token: "2678136558938821|b1c2335581efb2fbf39b0904a0d2a120"
          },
          headers: {
            "content-type": "application/json"
          }
        };
        request(options2, (err, resp) => {
          var userInfo = JSON.parse(resp.body);
          userInfo.email = req.body.email;

          req.userInfo = userInfo;
          res.set("x-token", req.body.token);
          next();
        });
      } else {
        res.status(401).send(invalidToken);
        return;
      }
    });
  } catch (err) {
    res.status(401).send(invalidToken);
    return;
  }
};

//create new function to virify token if  is a facebook , goole or app token

const invalidToken = new AuthResponse("Invalid Token", {});

//module.exports = verifyToken;
module.exports.createTokens = createTokens;
module.exports.verifyRefreshTokens = verifyRefreshTokens;
module.exports.confirmation = confirmation;
module.exports.createConfirmationTokens = createConfirmationTokens;
module.exports.confirmationSocial = confirmationSocial;
module.exports.confirmationSocialFacebook = confirmationSocialFacebook;
