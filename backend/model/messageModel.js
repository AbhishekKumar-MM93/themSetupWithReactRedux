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
      enum: [0, 1],
      default: 0, // 0 for text 1 for file
    },
    isRead: {
      type: Number,
      enum: [1, 2],
      default: 2,
    }, //1-read,2-not read
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "chat",
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("message", schema);
