import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "Empty Field" }).email("Invalid email."),

  password: z
    .string({ required_error: "Empty Field" })
    .min(5, "Password to short."),
});

export type SignInSchema = z.infer<typeof signInSchema>;
