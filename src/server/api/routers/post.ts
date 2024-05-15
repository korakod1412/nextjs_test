import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
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
      ];
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      let newDate = new Date();
      return ctx.db.hello.create({
        data: {
          name: input.name,
          email: input.email,
          createdAt: newDate,
          createdBy: "Korakod",
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({ nameEdit: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      let newDate = new Date();
      return ctx.db.user.updateMany({
        where: {
          name: input.nameEdit,
        },
        data: {
          name: "Viola the Magnificent",
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let newDate = new Date();
      return ctx.db.user.delete({
        where: {
          id: input.id,
        },
      });
    }),

  select: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findMany({});
      //  console.log(JSON.stringify(user));
      return user;
    }),
});
