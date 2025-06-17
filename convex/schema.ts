import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    product_name: v.string(),
    website: v.string(),
    category: v.string(),
    url: v.string(),
    price: v.number(),
    brand: v.string(),
    ingredients: v.string(),
    form: v.string(),
    type: v.optional(v.string()),
    rating: v.number(),
  }).index("by_ingredient", ["ingredients"]),
});
