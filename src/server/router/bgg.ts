import { BggClient } from "boardgamegeekclient";
import { z } from "zod";
import { createRouter } from "./context";

const bggClient = BggClient.Create();

export const bggRouter = createRouter().query("collection", {
  input: z.object({ username: z.string() }),
  resolve: async ({ input: { username } }) => {
    return (await bggClient.collection.query({ username }))[0];
  },
});
