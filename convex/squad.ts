import { query, mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export type Player = {
  id: Id<"users">;
  name: string;
  email: string;
};

export type Squad = {
  id: Id<"squads">;
  name: string;
  description: string;
  players: Player[];
};

export const getSquads = query({
  args: {
    gameId: v.id("games"),
  },
  handler: async (ctx, args) => {
    const squads = await ctx.db
      .query("squads")
      .filter((q) => q.eq(q.field("game"), args.gameId))
      .collect();

    return squads;
  },
});

export const createSquad = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    game: v.id("games"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not user found");
    }

    await ctx.db.insert("squads", {
      name: args.name,
      description: args.description,
      game: args.game,
      players: [],
    });
  },
});

export const getSquad = query({
  args: {
    squadId: v.id("squads"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // if (!identity) {
    //   throw new Error("No user found");
    // }

    const squad = await ctx.db.get(args.squadId);

    return squad;
  },
});

export const addPlayer = mutation({
  args: {
    id: v.id("users"),
    uid: v.union(v.string(), v.number()),
    squadId: v.id("squads"),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const squad = await ctx.db.get(args.squadId);

    if (!squad) {
      throw new Error("No squad found");
    }

    await ctx.db.patch(args.squadId, {
      players: [
        ...squad?.players,
        {
          id: args.id,
          uid: args.uid,
          name: args.name,
          imageUrl: args.imageUrl,
        },
      ],
    });
  },
});

export const removePlayer = mutation({
  args: {
    uid: v.union(v.string(), v.number()),
    squadId: v.id("squads"),
  },
  handler: async (ctx, args) => {
    const squad = await ctx.db.get(args.squadId);

    if (!squad) {
      throw new Error("No squad found");
    }

    const updatedPlayers = squad.players.filter(
      (player) => player.uid !== args.uid
    );

    await ctx.db.patch(args.squadId, {
      players: updatedPlayers,
    });
  },
});
