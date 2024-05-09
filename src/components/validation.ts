import { z } from "zod";

export const formSchema = z.object({
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
  email_str: z.string().trim().email(),
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
