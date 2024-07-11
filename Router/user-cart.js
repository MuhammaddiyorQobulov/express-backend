import Router from "express";
import UserCartController from "../api/UserCart/UserCartController.js";

const userCartRouter = new Router();

userCartRouter.get("/:userId", UserCartController.getCart);
userCartRouter.post("/:userId", UserCartController.addToCart);
export default userCartRouter;
