import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "The password should be longer than 8 characters" })
    .max(64, { message: "The password should be less than 64 characters" }),
});
