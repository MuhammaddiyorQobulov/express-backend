import authRouter from "./auth.js";

export const routers = [
  {
    path: "/api/auth",
    router: authRouter,
  },
];
