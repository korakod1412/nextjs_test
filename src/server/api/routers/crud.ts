import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as validators from "~/components/validation";

export const crudRouter = createTRPCRouter({
  create: protectedProcedure
    .input(validators.formSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      let newDate = new Date();
      return ctx.db.user.create({
        data: {
          name: input.input_str,
          email: input.email_str,
          address: input.address_str,
          surname: input.surname_str,
          phone: input.phone_str,
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
