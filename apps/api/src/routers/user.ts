import bcrypt from "bcryptjs";
import { z } from "zod";
import { loginInputSchema, userInputSchema } from "../../types";
import { db } from "../db";
import { generateToken } from "../jwtUtils";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import userLoginResponse from "../types/userLoginResponse";

export const userRouter = router({
  list: protectedProcedure.query(async () => {
    const users = await db.user.findMany();

    return users;
  }),
  byId: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);

    return user;
  }),
  create: publicProcedure.input(userInputSchema).mutation(async (opts) => {
    const { input } = opts;
    const user = await db.user.create(input);

    return user;
  }),
  delete: protectedProcedure.input(z.string()).mutation(async (opts) => {
    const { input } = opts;
    const user = await db.user.delete(input);

    return user;
  }),
  validateLogin: publicProcedure
    .input(loginInputSchema)
    .output(userLoginResponse)
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.findByUserName(input.userName);

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const passwordMatch = await bcrypt.compare(
        `${input.userName} ${input.password}`,
        user.password
      );

      if (!passwordMatch) {
        return {
          success: false,
          message: "User and password do not match",
        };
      }
      const token = generateToken(user.id);

      return {
        success: true,
        message: "User is valid",
        token,
        user: {
          id: user.id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      };
    }),
});
