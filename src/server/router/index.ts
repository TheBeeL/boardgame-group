// src/server/router/index.ts
import superjson from "superjson";

import { collectionRouter } from "server/router/collection";
import { boardgameRouter } from "server/router/boardgame";
import { libraryRouter } from "server/router/library";
import { userRouter } from "server/router/user";
import { createRouter } from "server/utils";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("collection.", collectionRouter)
  .merge("boardgame.", boardgameRouter)
  .merge("library.", libraryRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
