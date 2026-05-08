import { authRouter } from "./auth-router";
import { categoryRouter } from "./categoryRouter";
import { productRouter } from "./productRouter";
import { cartRouter } from "./cartRouter";
import { newsletterRouter } from "./newsletterRouter";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  category: categoryRouter,
  product: productRouter,
  cart: cartRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
