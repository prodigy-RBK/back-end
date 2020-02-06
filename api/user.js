const express = require("express");
const router = express.Router();
const userOperations = require("../operations/users");

const { confirmation, confirmationSocial, confirmationSocialFacebook } = require("../middleware/token");

router.post("/signUp", (req, res) => {
  console.log(req.body)
  userOperations.signUp(req).then(response => {
    res.send(response);
  });
});

router.post("/login", (req, res) => {
  userOperations.signIn(req, res).then(response => {
    res.send(response);
  });
});

router.get("/confirmation/:token", confirmation, (req, res) => {
  userOperations
    .confirmation(req.user.email)
    .then(response => {
      //console.log("respnse====<>", response)
      res.redirect('http://localhost:8080/')//
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/login/social", confirmationSocial, async (req, res) => {
  //console.log("----->", Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 15), '************')
  var verificationEmail = await userOperations.verificationEmail(req.userInfo.email)
  if (!verificationEmail) {
    var newUser = {
      firstName: req.userInfo.given_name,
      lastName: req.userInfo.family_name,
      email: req.userInfo.email,
      password: Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 15),
      isActive: true,
    }
    //we need to add googleId to user schema
    userOperations.addUserInfoSocial(newUser).then((response) => {
      console.log(response)
      // res.redirect('https://localhost:5000/')
    })
  } else {
    res.send({ status: true })
    // res.redirect('https://localhost:5000/productDetails')
  }
});

router.post("/login/socialF", confirmationSocialFacebook, async (req, res) => {
  //console.log("----->", Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 15), '************')

  var verificationEmail = await userOperations.verificationEmail(req.userInfo.email)
  if (!verificationEmail) {
    var newUser = {
      firstName: req.userInfo.first_name,
      lastName: req.userInfo.last_name,
      email: req.userInfo.email,
      password: Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 15),
      isActive: true,
    }
    userOperations.addUserInfoSocial(newUser).then((response) => {
      console.log(response)
      res.send({ status: true })
      // res.redirect('https://localhost:5000/')
    })
  } else {
    res.send({ status: true })
    // res.redirect('http://localhost:5000/')
  }
});
module.exports = router;
