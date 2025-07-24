import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
  // 1. Create test SMTP account on Ethereal
  const testAccount = await nodemailer.createTestAccount();

  // 2. Create a transporter using the test SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // 3. Send mail
  const info = await transporter.sendMail({
    from: '"Job Tracker 👨‍💻" <no-reply@jobtracker.com>',
    to,
    subject,
    html,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

export default sendEmail;