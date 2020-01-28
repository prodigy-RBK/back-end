const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  databaseURL: process.env.DATABASE_URI,//'mongodb://localhost:27017/Prodigy',//
  secretKey: process.env.SECRET_KEY,//'4d425aea4f8c859ec946b873ca53739f7dbdd7f7bb519d674e133041332896deb1e8e19b8b7d94ca62fd9ab123b0df5e57a584a169b4',
  secretKey2: process.env.SECRET_KEY2 //'4d425aea4f8c859ec946b873ca53739f7dbdd7f7bb519d674e133041332896deb1e8e1'
};
