const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendgridAPIKey); // authenticate using API key

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'e0426281@u.nus.edu',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'e0426281@u.nus.edu',
        subject: 'Our journey ends here...',
        text: `We're sad to see you go, ${name}. Share with us why you're leaving.`
    });
}
module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};