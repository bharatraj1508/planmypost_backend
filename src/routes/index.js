const router = require("express").Router();
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const testEmailServicesRoutes = require("./testEmailServices");

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/test-email-services", testEmailServicesRoutes);

module.exports = router;
