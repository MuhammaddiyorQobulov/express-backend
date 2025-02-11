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
authRouter.post("/role", AuthController.createRole);
authRouter.get(
  "/users/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  AuthController.getUserById
);
authRouter.get(
  "/users",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  AuthController.getUsers
);
authRouter.delete(
  "/users/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  AuthController.deleteUser
);
authRouter.get("/user", authMiddleWaree, AuthController.CheckIsLogin);
authRouter.put(
  "/users/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  AuthController.UpdateUser
);
authRouter.put("/profile", authMiddleWaree, AuthController.UpdateProfile);
export default authRouter;
