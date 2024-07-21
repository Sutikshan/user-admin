import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { UserInput } from "../types";

const prisma = new PrismaClient();

const userSelectList = {
  id: true,
  userName: true,
  firstName: true,
  middleName: true,
  lastName: true,
  branchId: true,
  position: true,
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
};

export const getPasswordHash = async (userName: string, password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(`${userName} ${password}`, salt);
};

export const db = {
  user: {
    findMany: async () => prisma.user.findMany({ select: userSelectList }),
    findById: async (id: string) =>
      prisma.user.findFirst({ select: userSelectList, where: { id } }),
    delete: async (userName: string) =>
      prisma.user.delete({
        where: {
          userName,
        },
      }),

    findByUserName: async (userName: string) =>
      prisma.user.findFirst({ where: { userName } }),

    create: async (data: UserInput) => {
      const passwordHash = await getPasswordHash(data.userName, data.password);

      const user = await prisma.user.create({
        data: {
          ...data,
          password: passwordHash,
        },
      });

      return {
        id: user.id,
        name: user.userName,

        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    },
  },
};
