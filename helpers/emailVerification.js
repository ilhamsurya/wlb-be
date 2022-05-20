const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const mailgun = require('mailgun-js')({
  apiKey: apiKey,
  domain,
});

function sendEmail(dataObject) {
  mailgun.messages().send(dataObject, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(body);
    }
  });
}

module.exports = sendEmail;
