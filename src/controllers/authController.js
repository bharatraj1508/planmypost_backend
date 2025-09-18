const { newAccessToken } = require("../utils/jwt");
const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).send({
        message: "This email already exist. Please use another email address",
      });
    }

    const user = await userService.createUser(name, email, password);

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
