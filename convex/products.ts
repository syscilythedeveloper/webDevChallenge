import { query } from "./_generated/server";
import { v } from "convex/values";

// });

export const getProductsByIngredient = query({
  args: { ingredient: v.string() },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_ingredient", (q) => q.eq("ingredients", args.ingredient))
      .collect();
    return products;
  },
});
