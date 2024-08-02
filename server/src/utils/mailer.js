const nodemailer = require('nodemailer');
const { OFFER_STATUS_DENIED, MAILER_EMAIL } = require('../constants');

const mailOptionalText = [
  `We understand this news might be disappointing, but please know that we appreciate the time and effort you put into your submission.
If you would like feedback on your offer or have any questions about the review process, please feel free to reach out to us. We encourage you to review our guidelines and submit another offer in the future.`,

  `Congratulations! 🎉 Your offer is now live, and we’re excited to see how it will perform.
Thank you for your contribution to our community. If you have any questions or need further assistance, please don't hesitate to reach out.`,
];

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: MAILER_EMAIL.ADDRESS,
    pass: MAILER_EMAIL.PASSWORD,
  },
});

module.exports.sendMail = async (to, status, userName) => {
  const reviewStatus = status === OFFER_STATUS_DENIED ? 'denied' : 'approved';
  const reviewText =
    status === OFFER_STATUS_DENIED ? mailOptionalText[0] : mailOptionalText[1];

  const info = await transporter.sendMail({
    from: `"SquadHelp" ${MAILER_EMAIL.ADDRESS}`,
    to,
    subject: `Moderator has ${reviewStatus} your offer`,
    text: `Dear ${userName}
We hope this message finds you well.

We are pleased to inform you that your offer has been ${reviewStatus} by our moderator team. ${reviewText}

Best regards,
The SquadHelp Team`,
  });
};
