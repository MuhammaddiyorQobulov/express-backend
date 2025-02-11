import authRouter from "./auth.js";
import productsRouter from "./products.js";
import typeRouter from "./type.js";
import userCartRouter from "./user-cart.js";
import orderRouter from "./order.js";
import deliverRouter from "./deliver.js";
export const routers = [
  {
    path: "/api/auth",
    router: authRouter,
  },
  {
    path: "/api/products",
    router: productsRouter,
  },
  {
    path: "/api/types",
    router: typeRouter,
  },
  {
    path: "/api/user-cart",
    router: userCartRouter,
  },
  {
    path: "/api/orders",
    router: orderRouter,
  },
  {
    path: "/api/deliver",
    router: deliverRouter,
  },
];
