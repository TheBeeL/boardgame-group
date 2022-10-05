import { createRouter } from "server/utils";
import { z } from "zod";

export const boardgameRouter = createRouter()
  .query("getAll", {
    resolve: async ({ ctx: { prisma } }) => {
      return await prisma.boardgame.findMany({
        where: { users: { some: {} } },
        orderBy: [{ name: "asc" }],
      });
    },
  })
  .query("get", {
    input: z.object({ id: z.number() }),
    resolve: async ({ input, ctx: { prisma } }) =>
      await prisma.boardgame.findUniqueOrThrow({
        where: input,
        include: { users: true },
      }),
  });
