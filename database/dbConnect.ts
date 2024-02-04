import mongoose from "mongoose";

const dbUri: string = process.env.DB_URL || "";

module.exports = (): Promise<typeof mongoose>=> {
  return mongoose.connect(dbUri);
}

