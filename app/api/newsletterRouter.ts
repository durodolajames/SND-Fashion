import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { subscribers } from "@db/schema";
import { eq } from "drizzle-orm";

export const newsletterRouter = createRouter({
  subscribe: publicQuery
    .input(
      z.object({
        email: z.string().email("Please enter a valid email address"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const existing = await db.query.subscribers.findFirst({
        where: eq(subscribers.email, input.email),
      });

      if (existing) {
        return { success: true, message: "You're already subscribed!" };
      }

      await db.insert(subscribers).values({ email: input.email });

      return { success: true, message: "Successfully subscribed!" };
    }),
});
