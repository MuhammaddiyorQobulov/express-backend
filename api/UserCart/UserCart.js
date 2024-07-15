import mongoose from "mongoose";
import Products from "../Products/Products.js";

const UserCart = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  products: [
    {
      ...Products.schema.obj,
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("UserCart", UserCart);
