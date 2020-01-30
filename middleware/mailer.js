var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mehditestmailer@gmail.com',
        pass: 'rbkrbk123456'
    }
});
var sendMail = async function (userMail, token) {
    var mailOptions = {
        from: 'mehditestmailer@gmail.com',
        to: userMail,
        subject: 'Sending Email using Node.js',
        text: `http://localhost:3000/api/user/confirmation/${token}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports.sendMail = sendMail