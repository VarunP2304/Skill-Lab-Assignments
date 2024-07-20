const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [8, "Password must be at least 8 characters"],
      // maxLength: [15, "Password must not be more than 15 characters"],
    },
    photo: {
      type: String,
      required: false,
      default:
        "data:image/jpeg;base64,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",
    },
    phone: {
      type: String,
      required: [true, "Please add a Phone Number"],
      default: "+91",
    },
    bio: {
      type: String,
      required: false,
      maxLength: [250, "Bio must not be more than 250 characters"],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
