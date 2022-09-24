import { createRouter } from "server/utils";

export const boardgameRouter = createRouter().query("getAll", {
  resolve: async ({ ctx: { prisma } }) => {
    return await prisma.boardgame.findMany({
      where: { users: { some: {} } },
      orderBy: [{ name: "asc" }],
    });
  },
});
