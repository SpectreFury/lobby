import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.optional(v.union(v.string(), v.number())),
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),
  games: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.id("_storage"),
  }),
  squads: defineTable({
    name: v.string(),
    description: v.string(),
    players: v.array(
      v.object({
        uid: v.union(v.string(), v.number()),
        id: v.id("users"),
        name: v.string(),
        imageUrl: v.string(),
      })
    ),
    game: v.id("games"),
  }),
});
