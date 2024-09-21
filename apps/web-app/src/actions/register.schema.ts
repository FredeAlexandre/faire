import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "The password should be longer than 8 characters" })
  .max(64, { message: "The password should be less than 64 characters" });

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine(({ password, passwordConfirm }) => password == passwordConfirm, {
    message: "Password and re-password should be the same",
  });
