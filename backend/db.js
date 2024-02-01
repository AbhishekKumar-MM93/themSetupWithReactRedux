import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://New:oMp4PzvDDWJeEsb9@cluster0.peughqr.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

export default connectDB;
