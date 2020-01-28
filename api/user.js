const express = require("express");
const router = express.Router();
const userOperations = require('../operations/users')
router.post("/signUp", (req, res) => {
    userOperations.signUp(req)
        .then(response => {
            //console.log(user)
            res.send(response)
        })
});

router.post("/signIn", (req, res) => {
    userOperations.signIn(req)
        .then(response => {
            console.log(response)
            res.send(response)
        })
});

module.exports = router;