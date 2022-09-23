import { createProtectedRouter } from "server/utils/protected";
import { z } from "zod";

export const userRouter = createProtectedRouter()
  .query("get", {
    resolve: async ({ ctx: { prisma, session } }) => {
      return await prisma.user.findUnique({ where: { id: session.user.id } });
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
