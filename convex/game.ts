import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getGames = query({
  handler: async (ctx) => {
    const games = await ctx.db.query("games").collect();
    return games;
  },
});

export const createGame = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    imageUrl: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("No user found");
    }

    await ctx.db.insert("games", {
      name: args.name,
      description: args.description,
      imageUrl: args.imageUrl,
      activeSquads: 0,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getImageUrl = query({
  args: {
    id: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const imageUrl = await ctx.storage.getUrl(args.id);

    return imageUrl;
  },
});

export const getGame = query({
  args: {
    id: v.id("games"),
  },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.id);

    return game;
  },
});
