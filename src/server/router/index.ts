// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { bggRouter } from "./bgg";
import { boardgameRouter } from "./boardgame";
import { collectionRouter } from "./collection";
import { userRouter } from "server/router/user";
import { libraryRouter } from "server/router/library";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("bgg.", bggRouter)
  .merge("collection.", collectionRouter)
  .merge("boardgame.", boardgameRouter)
  .merge("question.", protectedExampleRouter)
  .merge("library.", libraryRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
