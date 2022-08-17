import { resolve } from "path";
import { createRouter } from "./context";

export const boardgameRouter = createRouter().query("getAll", {
  resolve: async ({ ctx }) => {
    return await ctx.prisma.boardgame.findMany({ orderBy: [{ name: "asc" }] });
  },
});
