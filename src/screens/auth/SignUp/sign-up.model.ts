import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string({ required_error: "Empty Field" }).email("Invalid email."),
  phone: z.string({ required_error: "Empty Field" }).min(5, "Invalid phone."),
  password: z
    .string({ required_error: "Empty Field" })
    .min(5, "Password to short."),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
