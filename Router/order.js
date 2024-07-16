import { Router } from "express";
import OrderController from "../api/Orders/OrderController.js";
import { check } from "express-validator";
import authMiddleWaree from "../middlewaree/auth.js";

const orderRouter = new Router();

orderRouter.post(
  "/",
  [
    check("phone", "Telefon raqam kiritilmagan!").isLength({ min: 9 }),
    check("address", "Manzil kiring!").isLength({ min: 4 }),
  ],
  authMiddleWaree,
  OrderController.createOrder
);
orderRouter.get("/", OrderController.getOrders);
orderRouter.get("/:id", OrderController.getOneOrder);
orderRouter.put("/:id", OrderController.updateOrder);
orderRouter.post("/status", OrderController.createStatus);
export default orderRouter;
