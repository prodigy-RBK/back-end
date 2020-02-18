var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mehditestmailer@gmail.com",
    pass: "rbkrbk123456"
  }
});
var sendMail = async function(user, token) {
  var mailOptions = {
    from: "Prodigy Store",
    to: user.email,
    subject: "Please confirm your email",
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
    <title>Mailto</title>
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
    <style type="text/css">
    html { -webkit-text-size-adjust: none; -ms-text-size-adjust: none;}
    
      @media only screen and (min-device-width: 750px) {
        .table750 {width: 750px !important;}
      }
      @media only screen and (max-device-width: 750px), only screen and (max-width: 750px){
          table[class="table750"] {width: 100% !important;}
          .mob_b {width: 93% !important; max-width: 93% !important; min-width: 93% !important;}
          .mob_b1 {width: 100% !important; max-width: 100% !important; min-width: 100% !important;}
          .mob_left {text-align: left !important;}
          .mob_soc {width: 50% !important; max-width: 50% !important; min-width: 50% !important;}
          .mob_menu {width: 50% !important; max-width: 50% !important; min-width: 50% !important; box-shadow: inset -1px -1px 0 0 rgba(255, 255, 255, 0.2); }
          .mob_center {text-align: center !important;}
          .top_pad {height: 15px !important; max-height: 15px !important; min-height: 15px !important;}
          .mob_pad {width: 15px !important; max-width: 15px !important; min-width: 15px !important;}
          .mob_div {display: block !important;}
       }
       @media only screen and (max-device-width: 550px), only screen and (max-width: 550px){
          .mod_div {display: block !important;}
       }
      .table750 {width: 750px;}
    </style>
    </head>
    <body style="margin: 0; padding: 0;">
    
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;">
       <tr>
         <td align="center" valign="top">
           <!--[if (gte mso 9)|(IE)]>
             <table border="0" cellspacing="0" cellpadding="0">
             <tr><td align="center" valign="top" width="750"><![endif]-->
           <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750" style="width: 100%; max-width: 750px; min-width: 350px; background: #f3f3f3;">
             <tr>
                   <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
               <td align="center" valign="top" style="background: #ffffff;">
    
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                         <tr>
                            <td align="right" valign="top">
                               <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>
                            </td>
                         </tr>
                      </table>
    
                      <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                         <tr>
                            <td align="left" valign="top">
                               <div style="height: 39px; line-height: 39px; font-size: 37px;">&nbsp;</div>
                               <a href="#" target="_blank" style="display: block; max-height: 200px;">
                                  <img src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/86722894_806476143164319_5779365936901390336_n.png?_nc_cat=101&_nc_ohc=kE3K6H3Cik4AX9f9XqV&_nc_ht=scontent.ftun4-1.fna&oh=cf08d4eaa46d4118257097616d6dc9be&oe=5F011AA2" alt="Prodigy Store" width="250" border="0" style="display: block; width: 250px;" />
                               </a>
                               <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                            </td>
                         </tr>
                      </table>
    
                      <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                         <tr>
                            <td align="left" valign="top">
                               <font face="'Source Sans Pro', sans-serif" color="#1a1a1a" style="font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">
                                  <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">Hey ${user.firstName},</span>
                               </font>
                               <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                               <font face="'Source Sans Pro', sans-serif" color="#585858" style="font-size: 24px; line-height: 32px;">
                                  <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">Please complete your registration at the Prodigy store by clicking the link below</span>
                               </font>
                               <div style="height: 20px; line-height: 20px; font-size: 18px;">&nbsp;</div>
                               <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                               <table class="mob_btn" cellpadding="0" cellspacing="0" border="0" style="background: #27cbcc; border-radius: 4px;">
                                  <tr>
                                     <td align="center" valign="top"> 
                                        <a href="https://prodigy-rbk.herokuapp.com/api/user/confirmation/${token}" target="_blank" style="display: block; border: 1px solid #27cbcc; border-radius: 4px; padding: 12px 23px; font-family: 'Source Sans Pro', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">
                                           <font face="'Source Sans Pro', sans-serif" color="#ffffff" style="font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">
                                              <span style="font-family: 'Source Sans Pro', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">Confirm your account!</span>
                                           </font>
                                        </a>
                                     </td>
                                  </tr>
                               </table>
                               <div style="height: 75px; line-height: 75px; font-size: 73px;">&nbsp;</div>
                            </td>
                         </tr>
                      </table>
    
                      <table cellpadding="0" cellspacing="0" border="0" width="90%" style="width: 90% !important; min-width: 90%; max-width: 90%; border-width: 1px; border-style: solid; border-color: #e8e8e8; border-bottom: none; border-left: none; border-right: none;">
                         <tr>
                            <td align="left" valign="top">
                               <div style="height: 15px; line-height: 15px; font-size: 13px;">&nbsp;</div>
                            </td>
                         </tr>
                      </table>
    
                      <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                         <tr>
                            <td align="center" valign="top">
                               <!--[if (gte mso 9)|(IE)]>
                               <table border="0" cellspacing="0" cellpadding="0">
                               <tr><td align="center" valign="top" width="50"><![endif]-->
                               <div style="display: inline-block; vertical-align: top; width: 50px;">
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                     <tr>
                                        <td align="center" valign="top">
                                           <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                           <div style="display: block; max-width: 50px;">
                                           </div>
                                        </td>
                                     </tr>
                                  </table>
                               </div><!--[if (gte mso 9)|(IE)]></td><td align="left" valign="top" width="390"><![endif]--><div class="mob_div" style="display: inline-block; vertical-align: top; width: 62%; min-width: 260px;">
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                     <tr>
                                        <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                        <td class="mob_center" align="left" valign="top">
                                           <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                           <font face="'Source Sans Pro', sans-serif" color="#000000" style="font-size: 19px; line-height: 23px; font-weight: 600;">
                                              <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 19px; line-height: 23px; font-weight: 600;">Heni, Maher, Mehdi and Amine</span>
                                           </font>
                                           <div style="height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</div>
                                           <font face="'Source Sans Pro', sans-serif" color="#7f7f7f" style="font-size: 19px; line-height: 23px;">
                                              <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #7f7f7f; font-size: 19px; line-height: 23px;">Developers at Prodigy - RBK Tunisia</span>
                                           </font>
                                        </td>
                                        <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                     </tr>
                                  </table>
                               </div><!--[if (gte mso 9)|(IE)]></td><td align="left" valign="top" width="177"><![endif]--><div style="display: inline-block; vertical-align: top; width: 177px;">
                                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                     <tr>
                                        <td align="center" valign="top">
                                           <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                           <div style="display: block; max-height: 60px;">
                                              <img style="max-height: 60px;" src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/86293461_626321758193617_7447198391882219520_n.png?_nc_cat=110&_nc_ohc=q58D4ww8rTcAX-hww9d&_nc_ht=scontent.ftun4-1.fna&oh=d89cd8e196fde1af73f85c230f87de2c&oe=5F0049F5" alt="Prodigy Store" width="60" border="0" style="display: block; width: 60px; max-width: 100%;" />
                                           </div>
                                        </td>
                                     </tr>
                                  </table>
                               </div>
                               <!--[if (gte mso 9)|(IE)]>
                               </td></tr>
                               </table><![endif]-->
                               <div style="height: 30px; line-height: 30px; font-size: 28px;">&nbsp;</div>
                            </td>
                         </tr>
                      </table>
    
                   </td>
                   <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
                </tr>
             </table>
             <!--[if (gte mso 9)|(IE)]>
             </td></tr>
             </table><![endif]-->
          </td>
       </tr>
    </table>
    </body>
    </html>`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
var sendMailUpdatePasswordUser = async function(user, token) {
  token = token.replace(/[.]/g, "-");
  var mailOptions = {
    from: "mehditestmailer@gmail.com",
    to: user.email,
    subject: "Update password",
    //  text: `https://localhost:5000/forgetPassword/${token}`
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
   <html>
   <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
   <title>Mailto</title>
   <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
   <style type="text/css">
   html { -webkit-text-size-adjust: none; -ms-text-size-adjust: none;}
   
     @media only screen and (min-device-width: 750px) {
       .table750 {width: 750px !important;}
     }
     @media only screen and (max-device-width: 750px), only screen and (max-width: 750px){
         table[class="table750"] {width: 100% !important;}
         .mob_b {width: 93% !important; max-width: 93% !important; min-width: 93% !important;}
         .mob_b1 {width: 100% !important; max-width: 100% !important; min-width: 100% !important;}
         .mob_left {text-align: left !important;}
         .mob_soc {width: 50% !important; max-width: 50% !important; min-width: 50% !important;}
         .mob_menu {width: 50% !important; max-width: 50% !important; min-width: 50% !important; box-shadow: inset -1px -1px 0 0 rgba(255, 255, 255, 0.2); }
         .mob_center {text-align: center !important;}
         .top_pad {height: 15px !important; max-height: 15px !important; min-height: 15px !important;}
         .mob_pad {width: 15px !important; max-width: 15px !important; min-width: 15px !important;}
         .mob_div {display: block !important;}
      }
      @media only screen and (max-device-width: 550px), only screen and (max-width: 550px){
         .mod_div {display: block !important;}
      }
     .table750 {width: 750px;}
   </style>
   </head>
   <body style="margin: 0; padding: 0;">
   
   <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f3f3f3; min-width: 350px; font-size: 1px; line-height: normal;">
      <tr>
        <td align="center" valign="top">
          <!--[if (gte mso 9)|(IE)]>
            <table border="0" cellspacing="0" cellpadding="0">
            <tr><td align="center" valign="top" width="750"><![endif]-->
          <table cellpadding="0" cellspacing="0" border="0" width="750" class="table750" style="width: 100%; max-width: 750px; min-width: 350px; background: #f3f3f3;">
            <tr>
                  <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
              <td align="center" valign="top" style="background: #ffffff;">
   
                     <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                        <tr>
                           <td align="right" valign="top">
                              <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>
                           </td>
                        </tr>
                     </table>
   
                     <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                        <tr>
                           <td align="left" valign="top">
                              <div style="height: 39px; line-height: 39px; font-size: 37px;">&nbsp;</div>
                              <a href="#" target="_blank" style="display: block; max-height: 200px;">
                                 <img src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/s2048x2048/86722894_806476143164319_5779365936901390336_n.png?_nc_cat=101&_nc_ohc=kE3K6H3Cik4AX9f9XqV&_nc_ht=scontent.ftun4-1.fna&oh=cf08d4eaa46d4118257097616d6dc9be&oe=5F011AA2" alt="Prodigy Store" width="250" border="0" style="display: block; width: 250px;" />
                              </a>
                              <div style="height: 20px; line-height: 20px; font-size: 20px;">&nbsp;</div>
                           </td>
                        </tr>
                     </table>
   
                     <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                        <tr>
                           <td align="left" valign="top">
                              <font face="'Source Sans Pro', sans-serif" color="#1a1a1a" style="font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">
                                 <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #1a1a1a; font-size: 52px; line-height: 60px; font-weight: 300; letter-spacing: -1.5px;">Hey ${user.firstName},</span>
                              </font>
                              <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                              <font face="'Source Sans Pro', sans-serif" color="#585858" style="font-size: 24px; line-height: 32px;">
                                 <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #585858; font-size: 24px; line-height: 32px;">We are sending you this email because you requested to update your password.</span>
                              </font>
                              <div style="height: 20px; line-height: 20px; font-size: 18px;">&nbsp;</div>
                              <div style="height: 33px; line-height: 33px; font-size: 31px;">&nbsp;</div>
                              <table class="mob_btn" cellpadding="0" cellspacing="0" border="0" style="background: #27cbcc; border-radius: 4px;">
                                 <tr>
                                    <td align="center" valign="top">
                                       <a href="https://prodigy-store.onrender.com/forgetPassword/${token}" target="_blank" style="display: block; border: 1px solid #27cbcc; border-radius: 4px; padding: 12px 23px; font-family: 'Source Sans Pro', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">
                                          <font face="'Source Sans Pro', sans-serif" color="#ffffff" style="font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">
                                             <span style="font-family: 'Source Sans Pro', Arial, Verdana, Tahoma, Geneva, sans-serif; color: #ffffff; font-size: 20px; line-height: 30px; text-decoration: none; white-space: nowrap; font-weight: 600;">Update password</span>
                                          </font>
                                       </a>
                                    </td>
                                 </tr>
                              </table>
                              <div style="height: 75px; line-height: 75px; font-size: 73px;">&nbsp;</div>
                           </td>
                        </tr>
                     </table>
   
                     <table cellpadding="0" cellspacing="0" border="0" width="90%" style="width: 90% !important; min-width: 90%; max-width: 90%; border-width: 1px; border-style: solid; border-color: #e8e8e8; border-bottom: none; border-left: none; border-right: none;">
                        <tr>
                           <td align="left" valign="top">
                              <div style="height: 15px; line-height: 15px; font-size: 13px;">&nbsp;</div>
                           </td>
                        </tr>
                     </table>
   
                     <table cellpadding="0" cellspacing="0" border="0" width="88%" style="width: 88% !important; min-width: 88%; max-width: 88%;">
                        <tr>
                           <td align="center" valign="top">
                              <!--[if (gte mso 9)|(IE)]>
                              <table border="0" cellspacing="0" cellpadding="0">
                              <tr><td align="center" valign="top" width="50"><![endif]-->
                              <div style="display: inline-block; vertical-align: top; width: 50px;">
                                 <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                    <tr>
                                       <td align="center" valign="top">
                                          <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                          <div style="display: block; max-width: 50px;">
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                              </div><!--[if (gte mso 9)|(IE)]></td><td align="left" valign="top" width="390"><![endif]--><div class="mob_div" style="display: inline-block; vertical-align: top; width: 62%; min-width: 260px;">
                                 <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                    <tr>
                                       <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                       <td class="mob_center" align="left" valign="top">
                                          <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                          <font face="'Source Sans Pro', sans-serif" color="#000000" style="font-size: 19px; line-height: 23px; font-weight: 600;">
                                             <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #000000; font-size: 19px; line-height: 23px; font-weight: 600;">Heni, Maher, Mehdi and Amine</span>
                                          </font>
                                          <div style="height: 1px; line-height: 1px; font-size: 1px;">&nbsp;</div>
                                          <font face="'Source Sans Pro', sans-serif" color="#7f7f7f" style="font-size: 19px; line-height: 23px;">
                                             <span style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #7f7f7f; font-size: 19px; line-height: 23px;">Developers at Prodigy - RBK Tunisia</span>
                                          </font>
                                       </td>
                                       <td width="18" style="width: 18px; max-width: 18px; min-width: 18px;">&nbsp;</td>
                                    </tr>
                                 </table>
                              </div><!--[if (gte mso 9)|(IE)]></td><td align="left" valign="top" width="177"><![endif]--><div style="display: inline-block; vertical-align: top; width: 177px;">
                                 <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width: 100% !important; min-width: 100%; max-width: 100%;">
                                    <tr>
                                       <td align="center" valign="top">
                                          <div style="height: 13px; line-height: 13px; font-size: 11px;">&nbsp;</div>
                                          <div style="display: block; max-height: 60px;">
                                             <img style="max-height: 60px;" src="https://scontent.ftun4-1.fna.fbcdn.net/v/t1.15752-9/86293461_626321758193617_7447198391882219520_n.png?_nc_cat=110&_nc_ohc=q58D4ww8rTcAX-hww9d&_nc_ht=scontent.ftun4-1.fna&oh=d89cd8e196fde1af73f85c230f87de2c&oe=5F0049F5" alt="Prodigy Store" width="60" border="0" style="display: block; width: 60px; max-width: 100%;" />
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                              </div>
                              <!--[if (gte mso 9)|(IE)]>
                              </td></tr>
                              </table><![endif]-->
                              <div style="height: 30px; line-height: 30px; font-size: 28px;">&nbsp;</div>
                           </td>
                        </tr>
                     </table>
   
                  </td>
                  <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
               </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td></tr>
            </table><![endif]-->
         </td>
      </tr>
   </table>
   </body>
   </html>`
  };
  return transporter.sendMail(mailOptions).then((res, err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
var sendMailUpdatePasswordBrand = async function(userMail, token) {
  var mailOptions = {
    from: "mehditestmailer@gmail.com",
    to: userMail,
    subject: "Update password ",
    text: `http://localhost:3000/api/brand/updatePassword/${token}`
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
