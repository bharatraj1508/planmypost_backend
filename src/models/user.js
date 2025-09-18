const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  //Add more schema proeprties of your own here
});

// Middleware function executed before saving the user
userSchema.pre("save", function (next) {
  const user = this;

  // Checking if the password is modified
  if (!user.isModified("password")) {
    return next();
  }

  // Generating a salt and hashing the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Setting the hashed password
      user.password = hash;
      next();
    });
  });
});

// Middleware function executed before updating the user
userSchema.pre("updateOne", function (next) {
  const update = this._update;

  // Check if the password is being modified in the update
  if (!update || !update.password) {
    return next();
  }

  // Generate a salt and hash the new password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(update.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      // Set the hashed password in the update
      update.password = hash;
      next();
    });
  });
});

// Method to compare passwords
userSchema.methods.comparePassword = function (userPassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    // Comparing the provided password with the stored hashed password
    bcrypt
      .compare(userPassword, user.password)
      .then((isCompared) => {
        resolve(isCompared);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

// Creating the User model
mongoose.model("User", userSchema);