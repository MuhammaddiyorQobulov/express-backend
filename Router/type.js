import Router from "express";
import TypeController from "../api/ProductType/TypeController.js";

const typeRouter = new Router();
typeRouter.get("", TypeController.getTypes);
typeRouter.post("/", TypeController.createType);

export default typeRouter;
