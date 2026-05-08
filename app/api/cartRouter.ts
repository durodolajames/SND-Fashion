import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { cartItems } from "@db/schema";
import { eq, and } from "drizzle-orm";

export const cartRouter = createRouter({
  get: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db.query.cartItems.findMany({
        where: eq(cartItems.sessionId, input.sessionId),
        with: { product: true },
      });
      return items;
    }),

  getCount: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const items = await db.query.cartItems.findMany({
        where: eq(cartItems.sessionId, input.sessionId),
      });
      return items.reduce((sum, item) => sum + item.quantity, 0);
    }),

  add: publicQuery
    .input(
      z.object({
        sessionId: z.string(),
        productId: z.number(),
        quantity: z.number().min(1).default(1),
        size: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if item already in cart
      const existing = await db.query.cartItems.findFirst({
        where: and(
          eq(cartItems.sessionId, input.sessionId),
          eq(cartItems.productId, input.productId)
        ),
      });

      if (existing) {
        await db
          .update(cartItems)
          .set({ quantity: existing.quantity + input.quantity })
          .where(eq(cartItems.id, existing.id));
        return { success: true, action: "updated" };
      }

      await db.insert(cartItems).values({
        sessionId: input.sessionId,
        productId: input.productId,
        quantity: input.quantity,
        size: input.size,
      });

      return { success: true, action: "added" };
    }),

  updateQuantity: publicQuery
    .input(
      z.object({
        cartItemId: z.number(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(cartItems)
        .set({ quantity: input.quantity })
        .where(eq(cartItems.id, input.cartItemId));
      return { success: true };
    }),

  remove: publicQuery
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cartItems).where(eq(cartItems.id, input.cartItemId));
      return { success: true };
    }),

  clear: publicQuery
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cartItems).where(eq(cartItems.sessionId, input.sessionId));
      return { success: true };
    }),
});
