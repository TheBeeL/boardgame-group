import { Boardgame, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { TRPCError } from "@trpc/server";
import { BggClient } from "boardgamegeekclient";
import { z } from "zod";
import { createProtectedRouter } from "../protected-router";
import getCollection from "./getCollection";

const bggClient = BggClient.Create();

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
      await prisma.boardgame.deleteMany();

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
