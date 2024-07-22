import mongoose from "mongoose";
const Products = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: {
    type: String,
    default: null,
  },
  description: { type: String, default: "-" },
  type: {
    type: String,
    default: "MEAL",
    ref: "Type",
    enum: [
      "MEAL",
      "DRINK",
      "PIZZA",
      "DESERT",
      "SNACK",
      "SALAD",
      "OTHER",
      "FASTFOOD",
    ],
  },
  date: { type: Date, default: Date.now() },
});

export default mongoose.model("Products", Products);
