import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hasanjaved155@gmail.com",
    pass: "gxet ttyy emsn qtlz",
  },
});

export const sendEmail = async (email, message) => {
  const mailOptions = {
    from: "hasanjaved155@gmail.com",
    to: email,
    subject: "Password Reset Request",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};
