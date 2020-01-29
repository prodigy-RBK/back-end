const express = require("express");
const router = express.Router();
const brandOperations = require('../operations/brands')

router.post("/signUp", (req, res) => {
    brandOperations.signUp(req)
        .then(response => {
            console.log(response)
            res.send(response)
        })
});

router.post("/signIn", (req, res) => {
    brandOperations.signIn(req)
        .then(response => {
            console.log(response)
            res.send(response)
        })
});

module.exports = router;