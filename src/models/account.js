const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: [
      "active",
      "pending_verification",
      "deactivated",
      "suspended",
      "deleted",
      "archived",
    ],
    default: "pending_verification",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

accountSchema.pre("save", function (next) {
  const account = this;
  account.created_at = Date.now();
  account.updated_at = Date.now();

  next();
});

accountSchema.pre("updateOne", function (next) {
  const account = this;
  account.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Account", accountSchema);
