// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { bggRouter } from "./bgg";
import { boardgameRouter } from "./boardgame";
import { collectionRouter } from "./collection";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("bgg.", bggRouter)
  .merge("collection.", collectionRouter)
  .merge("boardgame.", boardgameRouter)
  .merge("question.", protectedExampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
