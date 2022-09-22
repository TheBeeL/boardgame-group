import { createRouter } from "./context";

export const libraryRouter = createRouter().query("getAll", {
  resolve: async ({ ctx: { prisma } }) =>
    await prisma.boardgame.findMany({
      where: { users: { some: {} } },
      orderBy: [{ name: "asc" }],
    }),
});
