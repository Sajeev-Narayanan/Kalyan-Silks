const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true, unique: true, trim: true },
  type: { type: String, required: true, trim: true },
  password: { type: String, require: true, trim: true },
});

userSchema.plugin(validator);
module.exports = mongoose.model("User", userSchema);
