import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm: {
    type: String,
  },
  avatar: {
    type: String,
  },
  roles: [{ type: String, ref: "Role" }],
  phone: {
    type: String,
  },
});

export default mongoose.model("User", User);
