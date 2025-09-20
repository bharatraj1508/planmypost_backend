const { newAccessToken } = require("../utils/jwt");
const userService = require("../services/userService");
const accountService = require("../services/accountService");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const { name, email, account, password } = req.body;
  try {
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).send({
        message: "This email already exist. Please use another email address",
      });
    }

    const user = await userService.createUser(name, email, password);

    const newAccount = await accountService.createAccount(user._id, account);

    await userService.updateUserById(user._id, {
      userAccounts: [newAccount._id],
    });

    const token = newAccessToken(user._id);

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userService.findUserByEmail(email);

    if (!existingUser || !(await existingUser.comparePassword(password)))
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Invalid email or password",
      });

    if (!existingUser.isEmailVerified) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        message: "Email not verified",
      });
    }

    const token = newAccessToken(existingUser._id);

    res.status(StatusCodes.OK).send({
      token,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
