import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const post2Router = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() })) //รับinputอะไรมา
    .query(({ input }) => { 
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    helloarray: publicProcedure
    .input(z.object({ text: z.string() })) //รับinputอะไรมา
    .query(({ input }) => { 
      return [
        {
          greeting: `Hello ${input.text}`,
        },
        {
          greeting: `Hello ${input.text}`,
        },
        {
          greeting: `Hello ${input.text}`,
        },
      ]
      
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
