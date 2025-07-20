import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to the database");
  } catch (error) {
    console.log("mongodb connection failed ", error);
  }
};
export default dbconnect;
