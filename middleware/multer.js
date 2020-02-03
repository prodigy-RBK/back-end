const multer = require("multer");
const ObjectId = require("mongoose").Types.ObjectId;

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, `${ObjectId().toHexString()}.${file.mimetype.substring(6, file.mimetype.length)}`);
  }
});

module.exports = multer({ storage: storage });
