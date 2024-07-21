import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { UserInput } from "../types";

const prisma = new PrismaClient();

const userSelectList = {
  id: true,
  name: true,
  email: true,
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
};

export const db = {
  user: {
    findMany: async () => prisma.user.findMany({ select: userSelectList }),
    findById: async (id: string) =>
      prisma.user.findFirst({ select: userSelectList, where: { id } }),

    findByEmail: async (email: string) =>
      prisma.user.findFirst({ where: { email } }),

    create: async (data: UserInput) => {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = await bcrypt.hash(
        `${data.email} ${data.password}`,
        salt
      );

      const user = await prisma.user.create({
        data: {
          ...data,
          password: passwordHash,
        },
      });

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    },
  },
};
