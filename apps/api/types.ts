import { z } from "zod";

export const loginInputSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid email address",
    })
    .min(3, {
      message: "Email is required",
    }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const userInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
export type UserInput = z.infer<typeof userInputSchema>;

export const userSchema = userInputSchema.extend({
  id: z.string(),
});

export type User = z.infer<typeof userSchema>;
