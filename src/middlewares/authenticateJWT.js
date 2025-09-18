// middlewares/authenticateJWT.js
const passport = require("passport");
const express = require("express");
const router = express.Router();

router.use(passport.initialize());
require("../middlewares/passport");

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or missing token" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateJWT;
