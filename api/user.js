const express = require("express");
const router = express.Router();
const userOperations = require("../operations/users");

const { confirmation } = require("../middleware/token");

router.post("/signUp", (req, res) => {
  //console.log(req)
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

module.exports = router;
