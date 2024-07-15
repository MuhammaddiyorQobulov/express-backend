import Router from "express";
import ProductsController from "../api/Products/ProductsController.js";
import authMiddleWaree from "../middlewaree/auth.js";

const productsRouter = new Router();

productsRouter.get("/", authMiddleWaree, ProductsController.getProducts);
productsRouter.post("/", ProductsController.createProduct);
productsRouter.delete("/:id", ProductsController.deleteProduct);
productsRouter.put("/:id", ProductsController.updateProduct);
productsRouter.get("/:id", ProductsController.getOne);

export default productsRouter;
