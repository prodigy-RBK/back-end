const express = require("express");
const router = express.Router();
const userOperations = require("../operations/users");

const { confirmation } = require("../middleware/token");

router.post("/signUp", (req, res) => {
  console.log(req.body)
  userOperations.signUp(req).then(response => {
    res.send(response);
  });
});

router.post("/login", (req, res) => {
  userOperations.signIn(req).then(response => {
    console.log(response);
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
module.exports = router;
