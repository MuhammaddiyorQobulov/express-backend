import mongoose from "mongoose";

const Order = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Object,
      ref: "UserCart",
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  comment: { type: String },
  status: {
    type: String,
    default: "NEW",
    enum: [
      "NEW",
      "COMPLETED",
      "IN_PROCESS",
      "ON_WAY",
      "DELIVERED",
      "RETURNED",
      "CANCELLED",
    ],
    ref: "OrderStatus",
  },
  deliverId: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Order", Order);
