import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //console.log("Connected to database successfully");
  } catch (error) {
    console.error("Unable to connect to database", error);
    process.exit(1);
  }
};
