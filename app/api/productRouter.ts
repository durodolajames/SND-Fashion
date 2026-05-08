import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products, categories } from "@db/schema";
import { eq, and, desc, like } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        categoryId: z.number().optional(),
        search: z.string().optional(),
        featured: z.boolean().optional(),
        newArrivals: z.boolean().optional(),
        limit: z.number().min(1).max(100).optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [];

      if (input?.categoryId) {
        conditions.push(eq(products.categoryId, input.categoryId));
      }
      if (input?.search) {
        conditions.push(like(products.name, `%${input.search}%`));
      }
      if (input?.featured) {
        conditions.push(eq(products.isFeatured, "yes"));
      }
      if (input?.newArrivals) {
        conditions.push(eq(products.isNew, "yes"));
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const items = await db.query.products.findMany({
        where,
        with: { category: true },
        orderBy: desc(products.createdAt),
        limit: input?.limit ?? 50,
      });

      return items;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.products.findFirst({
        where: eq(products.id, input.id),
        with: { category: true },
      });
    }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db.query.products.findFirst({
        where: eq(products.slug, input.slug),
        with: { category: true },
      });
    }),

  getByCategory: publicQuery
    .input(z.object({ categorySlug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const category = await db.query.categories.findFirst({
        where: eq(categories.slug, input.categorySlug),
      });

      if (!category) return { category: null, products: [] };

      const items = await db.query.products.findMany({
        where: eq(products.categoryId, category.id),
        with: { category: true },
        orderBy: desc(products.createdAt),
      });

      return { category, products: items };
    }),

  getFeatured: publicQuery.query(async () => {
    const db = getDb();
    return db.query.products.findMany({
      where: eq(products.isFeatured, "yes"),
      with: { category: true },
      limit: 8,
    });
  }),

  getNewArrivals: publicQuery.query(async () => {
    const db = getDb();
    return db.query.products.findMany({
      where: eq(products.isNew, "yes"),
      with: { category: true },
      limit: 8,
    });
  }),
});
