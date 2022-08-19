import { Boardgame, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { BggClient } from "boardgamegeekclient";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

const bggClient = BggClient.Create();

export const collectionRouter = createProtectedRouter().mutation(
  "syncCollection",
  {
    resolve: async ({ ctx: { prisma, session } }) => {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      // TODO: manage Collection sync
      await prisma.boardgame.deleteMany();

      if (user?.bggUsername) {
        const bggCollectionQuery = await bggClient.collection.query({
          username: user.bggUsername,
          own: 1,
        });

        if (bggCollectionQuery.length > 0) {
          const bggCollection = bggCollectionQuery[0]!;
          const bggGames = (
            await bggClient.thing.query({
              id: bggCollection.items.map((i) => i.objectid),
              stats: 1,
            })
          ).sort((a, b) => {
            if (a.type == b.type) return 0;
            if (a.type == "boardgame") return -1;
            return 1;
          });

          bggGames.forEach(async (game) => {
            const bgData: Prisma.BoardgameCreateInput = {
              id: game.id,
              name: game.name,
              image: game.image,
              thumbnail: game.thumbnail,
              weight: new Decimal(game.statistics.ratings.averageweight),
            };

            if (game.type == "boardgameexpansion") {
              return;
              // TODO: manage expansions, current error
              // an expansion can have multiple inbounds
              // const expansionId = game.links.find(
              //   (link) => link.type == "boardgameexpansion" && link.inbound,
              // )?.id;
              // if (expansionId) {
              //   bgData.expansionOf = { connect: { id: expansionId } };
              // }
            }

            await prisma.boardgame.create({ data: bgData });
          });
        }
      }
    },
  },
);
