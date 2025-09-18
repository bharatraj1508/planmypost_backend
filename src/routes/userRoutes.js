const express = require("express");

const router = express.Router();

const {
  viewUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const authenticateJWT = require("../middlewares/authenticateJWT");

router.use(authenticateJWT);

router.get("/", viewUserProfile);
router.put("/", updateUserProfile);
router.delete("/", deleteUserProfile);

module.exports = router;
