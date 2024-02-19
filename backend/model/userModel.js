import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    image: {
      type: String,
    },
    loginTime: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", user);
