import { createRouter } from "server/utils";

export const libraryRouter = createRouter().query("getAll", {
  resolve: async ({ ctx: { prisma } }) =>
    await prisma.boardgame.findMany({
      where: { users: { some: {} } },
      orderBy: [{ name: "asc" }],
    }),
});
