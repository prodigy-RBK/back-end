var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mehditestmailer@gmail.com",
    pass: "rbkrbk123456"
  }
});
var sendMail = async function(userMail, token) {
  var mailOptions = {
    from: "mehditestmailer@gmail.com",
    to: userMail,
    subject: "Sending Email using Node.js",
    text: `http://localhost:3000/api/user/confirmation/${token}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
var sendMailUpdatePasswordUser = async function(userMail, token) {
  var mailOptions = {
    from: "mehditestmailer@gmail.com",
    to: userMail,
    subject: "Update password",
    text: `http://localhost:3000/api/user/updatePassword/${token}`
  };
  return transporter.sendMail(mailOptions).then((res, err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
  //   , function(error, info) {
  //     if (error) {
  //       console.log(error);
  //       test = false;
  //     } else {
  //       console.log("Email sent: " + info.response);
  //
  //     }
  //   });
};
var sendMailUpdatePasswordBrand = async function(userMail, token) {
  var mailOptions = {
    from: "mehditestmailer@gmail.com",
    to: userMail,
    subject: "Update password ",
    text: `http://localhost:3000/api/brand//updatePassword/${token}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
module.exports.sendMail = sendMail;
module.exports.sendMailUpdatePasswordUser = sendMailUpdatePasswordUser;
module.exports.sendMailUpdatePasswordBrand = sendMailUpdatePasswordBrand;
