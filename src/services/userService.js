const mongoose = require("mongoose");
const User = mongoose.model("User");

const createUser = async (name, email, password) => {
  try {
    const user = new User({ name, email, password });
    return await user.save();
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email }).populate("userAccounts");
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, payload) => {
  try {
    return await User.findByIdAndUpdate(id, payload, { new: true }).select(
      "-password"
    );
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
};
