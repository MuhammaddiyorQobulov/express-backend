import Router from "express";
import ProductsController from "../api/Products/ProductsController.js";

const productsRouter = new Router();

productsRouter.get("/", ProductsController.getProducts);
productsRouter.post("/", ProductsController.createProduct);
productsRouter.delete("/:id", ProductsController.deleteProduct);
productsRouter.put("/:id", ProductsController.updateProduct);
// productsRouter.get("/:type", ProductsController.getProductsByType);

export default productsRouter;
