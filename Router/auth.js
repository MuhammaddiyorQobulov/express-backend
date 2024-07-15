import Router from "express";
import AuthController from "../api/Auth/AuthController.js";
import { check } from "express-validator";
import authMiddleWaree from "../middlewaree/auth.js";
import roleMiddleWaree from "../middlewaree/role.js";
const authRouter = new Router();

authRouter.post(
  "/registration",
  [
    check("username", "Username must be at least 4").isLength({ min: 4 }),
    check(
      "password",
      "Password must be at least 4 and not more than 12 characters"
    ).isLength({ min: 4, max: 12 }),
  ],
  AuthController.registration
);
authRouter.post("/login", AuthController.login);
authRouter.get(
  "/users",
  roleMiddleWaree(["ADMIN", "USER"]),
  AuthController.getUsers
);

export default authRouter;
