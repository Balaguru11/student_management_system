const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// taking OAuth2 from google
const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

async function sendMail(mailOptions) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        accessToken: accessToken,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    console.log(mailOptions);
    const result = transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
}

sendMail()
  .then((result) => {
    console.log("Email has been sent.", result);
  })
  .catch((err) => console.log(err.message));

module.exports = sendMail;
