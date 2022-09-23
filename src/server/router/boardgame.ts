import { createRouter } from "server/utils";

export const boardgameRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.boardgame.findMany({
        orderBy: [{ name: "asc" }],
      });
    },
  })
  .query("getCollection", {
    resolve: async ({ ctx: { prisma, session } }) => {
      return await prisma.boardgame.findMany({
        where: { users: { some: { id: session!.user!.id } } },
        orderBy: [{ name: "asc" }],
      });
    },
  });
