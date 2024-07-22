import mongoose from "mongoose";

const OrderStatus = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    unique: true,
    enum: [
      "NEW",
      "COMPLETED",
      "IN_PROCESS",
      "DELIVERED",
      "RETURNED",
      "CANCELED",
      "DELIVERING",
    ],
  },
  title: {
    type: String,
    required: true,
  },
});
export default mongoose.model("OrderStatus", OrderStatus);
