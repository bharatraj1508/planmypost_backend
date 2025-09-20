const express = require("express");

const router = express.Router();

const testEmailController = require("../controllers/testEmailController");

router.post("/", testEmailController.sendEmailController);

module.exports = router;
