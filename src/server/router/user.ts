import { createProtectedRouter } from "./protected-router";

export const userRouter = createProtectedRouter().query("get", {
  resolve: async ({ ctx: { prisma, session } }) => {
    return await prisma.user.findUnique({ where: { id: session.user.id } });
  },
});
