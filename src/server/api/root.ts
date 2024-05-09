import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { postRouter } from "~/server/api/routers/post";
import { post2Router } from "~/server/api/routers/post2";
import { createTRPCRouter } from "~/server/api/trpc";
import { crudRouter } from "~/server/api/routers/crud";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  post2: post2Router,
  crud: crudRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;
