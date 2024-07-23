import DeliverController from "../api/Deliver/DeliverController.js";
import { Router } from "express";
import authMiddleWaree from "../middlewaree/auth.js";
import roleMiddleWaree from "../middlewaree/role.js";

const deliverRouter = new Router();
deliverRouter.get(
  "/",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN", "DELIVER"]),
  DeliverController.getDeliverOrders
);

deliverRouter.put(
  "/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN", "DELIVER"]),
  DeliverController.updateDeliverOrder
);

export default deliverRouter;
