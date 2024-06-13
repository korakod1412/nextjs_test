import { z } from "zod";
import _ from "lodash";
import { api } from "~/utils/api";
import { db } from "~/server/db";

export const login = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const formSchema = z.object({
  idUser: z.number() || z.string() || null,
  input_str: z
    .string()
    .trim()
    .min(2, { message: "First name must be more than 1 character" }),
  surname_str: z
    .string()
    .trim()
    .min(2, { message: "Last name must be more than 1 character" }),
  address_str: z
    .string()
    .trim()
    .min(2, { message: "address must be more than 1 character" }),
  email_str: z
    .string()
    .trim()
    .email()
    .refine(
      async (email) => {
        // let res = await fetch(`${process.env.URL}api/getEmail`, {
        let res = await fetch("http://localhost:5000/api/getEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        if (res.ok) {
          let { status } = await res.json();
          return status;
        }
      },
      { message: "Email Duplicate" },
    ),
  // birthDate: z.string().pipe(z.coerce.date()),
  phone_str: z
    .string()
    .trim()
    .refine(
      (phone) => {
        const sections = phone.split("-");
        if (
          sections.length !== 3 ||
          sections[0]?.length !== 3 ||
          sections[1]?.length !== 3 ||
          sections[2]?.length !== 4
        ) {
          return false;
        }
        return true;
      },
      { message: "Phone number must be xxx-xxx-xxxx" },
    ),
});

export type FormSchemaInputType = z.input<typeof formSchema>;
export type FormSchemaOutputType = z.output<typeof formSchema>;
