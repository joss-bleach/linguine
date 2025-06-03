import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Enter a password" }),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Enter a name" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Enter a password" }),
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
