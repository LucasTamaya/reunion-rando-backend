import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log("Connected to MongoDB!");
  } catch (err: any) {
    console.error(err.message);
  }
};
