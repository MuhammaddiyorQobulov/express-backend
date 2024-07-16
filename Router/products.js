import Router from "express";
import ProductsController from "../api/Products/ProductsController.js";
import authMiddleWaree from "../middlewaree/auth.js";
import roleMiddleWaree from "../middlewaree/role.js";

const productsRouter = new Router();

productsRouter.get("/", authMiddleWaree, ProductsController.getProducts);
productsRouter.post(
  "/",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN", "USER"]),
  ProductsController.createProduct
);
productsRouter.delete(
  "/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  ProductsController.deleteProduct
);
productsRouter.put(
  "/:id",
  authMiddleWaree,
  roleMiddleWaree(["ADMIN"]),
  ProductsController.updateProduct
);
productsRouter.get("/:id", ProductsController.getOne);
export default productsRouter;
