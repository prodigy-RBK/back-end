const express = require("express");
const router = express.Router();
const userOperations = require("../operations/users");

router.post("/signUp", (req, res) => {
  userOperations.signUp(req).then(response => {
    res.send(response);
  });
});

<<<<<<< HEAD
router.post("/signIn", (req, res) => {
  userOperations.signIn(req).then(response => {
    res.send(response);
  });
=======
router.post("/login", (req, res) => {
    userOperations.signIn(req)
        .then(response => {
            console.log(response)
            res.send(response)
        })
>>>>>>> 3655431413ebaf55f173caa091f8c065d99280b3
});

module.exports = router;
