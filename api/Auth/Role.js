import mongoose from "mongoose";

const Role = new mongoose.Schema({
  value: {
    type: String,
    unique: true,
    default: "USER",
    enum: ["ADMIN", "USER", "DELIVER"],
  },
});

export default mongoose.model("Role", Role);
