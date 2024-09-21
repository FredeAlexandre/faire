import { z } from "zod";

export const email = z
  .string()
  .email({ message: "Please enter a valid email" });

export const password = z
  .string()
  .min(8, { message: "The password should be longer than 8 characters" })
  .max(64, { message: "The password should be less than 64 characters" });

export const loginSchema = z.object({
  email,
  password,
});

export const registerSchema = z
  .object({
    email,
    password,
    passwordConfirm: password,
  })
  .refine(({ password, passwordConfirm }) => password == passwordConfirm, {
    message: "Password and re-password should be the same",
  });
