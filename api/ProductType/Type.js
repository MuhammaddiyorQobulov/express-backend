import mongoose, { STATES } from "mongoose";

const Type = new mongoose.Schema({
  type: {
    type: String,
    default: "MEAL",
    enum: ["MEAL", "DRINK", "PIZZA", "SWEET", "SNACK","SALAD", "OTHER","FASTFOOD"],
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Type", Type);
