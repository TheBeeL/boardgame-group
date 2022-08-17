import { BggClient } from "boardgamegeekclient";
import { z } from "zod";
import { createRouter } from "./context";

const bggClient = BggClient.Create();

export const bggRouter = createRouter()
  .query("collection", {
    input: z.object({ username: z.string() }),
    resolve: async ({ input: { username } }) => {
      return (await bggClient.collection.query({ username }))[0];
    },
  })
  .mutation("loadCollection", {
    input: z.object({ username: z.string() }),
    resolve: async ({ ctx, input: { username } }) => {
      const collection = (await bggClient.collection.query({ username }))[0]!;
      (
        await bggClient.thing.query({
          id: collection.items.map((i) => i.objectid),
          stats: 1,
        })
      ).forEach(async (game) => {
        await ctx.prisma.boardgame.create({
          data: {
            name: game.name,
            image: game.image,
            thumbnail: game.thumbnail,
            weight: game.statistics.ratings.averageweight,
          },
        });
      });
    },
  });
