const nodemailer = require("nodemailer");

exports.sendMail = async (receiver, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: "c420015e65d38d",
      pass: "e21f4706dafca9",
    },
  });

  let msg = {
    from: '"Node Mailer" <xjihxre694@tormails.com>',
    to: receiver,
    subject,
    text,
    html,
  };

  let info = await transporter.sendMail(msg);
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
