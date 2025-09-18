const { StatusCodes } = require("http-status-codes");
const userService = require("../services/userService");

const viewUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "User not found" });
    }

    res.status(StatusCodes.OK).send(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    const payload = { email, name, updated_at: Date.now() };
    const user = await userService.updateUserById(req.user._id, payload);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "User not found" });
    }

    res.status(StatusCodes.OK).send({
      message: "user updated successfully",
      user,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

const deleteUserProfile = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.user._id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "User not found" });
    }

    res.status(StatusCodes.OK).send({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

module.exports = {
  viewUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
