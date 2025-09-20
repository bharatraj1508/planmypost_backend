const { StatusCodes } = require("http-status-codes");
const { sendTestEmail } = require("../services/mailer/sender");

const sendEmailController = async (req, res) => {
  const { email } = req.body;
  await sendTestEmail(email);
  res.status(StatusCodes.OK).send({ message: "Email sent successfully" });
};

module.exports = {
  sendEmailController,
};
