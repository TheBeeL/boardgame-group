import * as trpc from "@trpc/server";
import { Context } from "server/utils";

export const createRouter = () => trpc.router<Context>();
