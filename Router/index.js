import authRouter from "./auth.js";
import productsRouter from "./products.js";
import typeRouter from "./type.js";

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
    path: "/api/type",
    router: typeRouter,
  },
];
