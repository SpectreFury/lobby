import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
  games: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.id("_storage"),
  }),
  squads: defineTable({
    name: v.string(),
    description: v.string(),
    players: v.array(v.id("users")),
    game: v.id("games"),
  }),
});
