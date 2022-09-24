import { TRPCError } from "@trpc/server";
import { getUserCollection } from "server/BggConnection";
import { createProtectedRouter } from "server/utils/protected";
import { z } from "zod";

export const userRouter = createProtectedRouter()
  .query("get", {
    resolve: async ({ ctx: { prisma, session } }) => {
      return await prisma.user.findUnique({ where: { id: session.user.id } });
    },
  })
  .query("getCollection", {
    resolve: async ({ ctx: { prisma, session } }) => {
      return await prisma.boardgame.findMany({
        where: { users: { some: { id: session.user.id } } },
        orderBy: [{ name: "asc" }],
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("syncBGGCollection", {
    resolve: async ({ ctx: { prisma, session } }) => {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: session.user.id },
      });

      if (!user.bggUsername) {
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

      const collection = await getUserCollection(user.bggUsername);

      if (!collection) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      collection.forEach(async ({ id, ...boardgame }) => {
        boardgame.users = { connect: [{ id: user.id }] };
        await prisma.boardgame.upsert({
          where: { id },
          update: boardgame,
          create: { id, ...boardgame },
        });
      });
    },
  })

  .mutation("update", {
    input: z.object({
      bggUsername: z.string(),
    }),
    resolve: async ({ input, ctx: { prisma, session } }) => {
      await prisma.user.update({
        where: { id: session.user.id },
        data: input,
      });
    },
  });
