import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined");
  }
  if (isConnected) {
    return;
  }
  try {
    const options: ConnectOptions = {
      dbName: "netflix",
      autoCreate: true,
    };
    const db = await mongoose.connect(process.env.MONGODB_URL, options);
    console.log("Connected to MongoDB");
    isConnected = true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
