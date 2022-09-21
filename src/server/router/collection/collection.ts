import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "../protected-router";
import getCollection from "./getCollection";

export const collectionRouter = createProtectedRouter().mutation(
  "syncCollection",
  {
    resolve: async ({ ctx: { prisma, session } }) => {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (typeof user.bggUsername != "string" && !user.bggUsername) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      // TODO: manage Collection sync
      await prisma.user.update({
        where: { id: user.id },
        data: { collection: {} },
      });

      const games = await getCollection(user);

      if (!games) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      games.forEach(
        async (game) => await prisma.boardgame.create({ data: game }),
      );
    },
  },
);
