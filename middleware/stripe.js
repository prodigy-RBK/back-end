const router = require("express").Router();
const config = require("../config/index");
const stripe = require("stripe")(config.stripeSecretKey);

router.post("/purchase", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.token
    });
    res.status(201).send(charge);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/customers", async (req, res) => {
  try {
    const customers = await stripe.customers.list();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
