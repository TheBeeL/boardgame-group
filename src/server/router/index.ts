// src/server/router/index.ts
import superjson from "superjson";

import { boardgameRouter } from "server/router/boardgame";
import { userRouter } from "server/router/user";
import { createRouter } from "server/utils";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("boardgame.", boardgameRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
