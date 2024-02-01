import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    message: {
      type: String,
      default: "",
    },
    messageType: {
      type: Number,
      enum: [0, 1, 2],
      default: 0, // o for text 1 for file 2 for video
    },
    isRead: {
      type: Number,
      enum: [1, 2],
      default: 2,
    }, //1-read,2-not read

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    lastMessage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("message", schema);
