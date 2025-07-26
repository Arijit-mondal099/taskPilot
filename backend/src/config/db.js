import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected Succcessfully:", res.connection.host);
  } catch (error) {
    console.error("DB Connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
