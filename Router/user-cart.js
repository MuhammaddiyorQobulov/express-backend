import Router from "express";
import UserCartController from "../api/UserCart/UserCartController.js";
import authMiddleWaree from "../middlewaree/auth.js";

const userCartRouter = new Router();

userCartRouter.get("/", authMiddleWaree, UserCartController.getCart);
userCartRouter.post(
  "/",
  authMiddleWaree,
  UserCartController.addToCart
);
userCartRouter.put("/", authMiddleWaree, UserCartController.removeFromCart);
export default userCartRouter;
