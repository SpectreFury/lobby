import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    peerId: v.optional(v.string()),
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),
  games: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.id("_storage"),
    activeSquads: v.number(),
  }),
  squads: defineTable({
    name: v.string(),
    description: v.string(),
    players: v.array(
      v.object({
        peerId: v.string(),
        id: v.id("users"),
        name: v.string(),
        imageUrl: v.string(),
      })
    ),
    game: v.id("games"),
  }),
});
