const mongoose = require("mongoose");
const Account = mongoose.model("Account");

const createAccount = async (owner, account) => {
  try {
    const accountDoc = new Account({ owner, name: account });
    return await accountDoc.save();
  } catch (error) {
    throw error;
  }
};

const getAccountById = async (id) => {
  try {
    return await Account.findById(id).populate("owner").select("-password");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAccount,
  getAccountById,
};
