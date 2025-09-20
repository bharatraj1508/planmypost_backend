const { sendEmail } = require("./config");
const TestEmailTemplate = require("./template/testEmailTemplate");

const sendTestEmail = async (email) => {
  await sendEmail(new TestEmailTemplate(email));
};

module.exports = {
  sendTestEmail,
};
