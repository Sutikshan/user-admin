import { z } from "zod";

export const loginInputSchema = z.object({
  userName: z.string().min(3, {
    message: "User name is required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const userInputSchema = z.object({
  userName: z.string().min(3, {
    message: "User name is required",
  }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  position: z.string().min(1, {
    message: "Position name is required",
  }),
  branchId: z.number().min(0, {
    message: "branch id is required",
  }),
  password: z.string().min(6),
});
export type UserInput = z.infer<typeof userInputSchema>;

export const userSchema = userInputSchema.extend({
  id: z.string(),
});

export type User = z.infer<typeof userSchema>;
