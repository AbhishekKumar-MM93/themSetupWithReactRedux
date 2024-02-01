import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    discription: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", product);
