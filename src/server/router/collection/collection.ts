import { TRPCError } from "@trpc/server";
import { createProtectedRouter } from "../protected-router";
import getBGGCollection from "./getBGGCollection";

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

      // Clear user's collection
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          collection: {
            set: [],
          },
        },
      });

      const boardgames = await getBGGCollection(user);

      if (!boardgames) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      boardgames.forEach(async ({ id, ...boardgame }) => {
        await prisma.boardgame.upsert({
          where: { id },
          update: boardgame,
          create: { id, ...boardgame },
        });
      });
    },
  },
);
