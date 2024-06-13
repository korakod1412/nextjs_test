import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as validators from "~/features/manageUser/validation";
import { generateRefreshToken } from "~/features/auth/helpers/token";
export const crudRouter = createTRPCRouter({
  create: publicProcedure
    .input(validators.formSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      let newDate = new Date();
      const hashedPassword = await bcrypt.hash("P@ssw0rd", 12);
      return ctx.db.user.create({
        data: {
          name: input.input_str,
          username: "samphao",
          email: input.email_str,
          address: input.address_str,
          surname: input.surname_str,
          phone: input.phone_str,
          createdAt: newDate,
          createdBy: "Korakod",

          ...generateRefreshToken(),
          password: hashedPassword,
        },
      });
    }),

  update: publicProcedure
    .input(validators.formSchema)
    .mutation(async ({ ctx, input }) => {
      let newDate = new Date();
      return ctx.db.user.update({
        where: {
          id: input.idUser,
        },

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

  delete: publicProcedure
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

  select: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findMany({
        orderBy: {
          id: "desc",
        },
      });

      return user;
    }),
  selectUniq: protectedProcedure.query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    console.log("all=" + JSON.stringify(user));
    return user;
  }),
});
