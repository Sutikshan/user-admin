// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { getPasswordHash } from "../src/db";
import { users } from "./users_data";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create dummy data
  // create two dummy recipes
  await Promise.all(
    users.map(async (user) => {
      const password = await getPasswordHash(user.userName, user.password);

      return prisma.user.create({
        data: {
          userName: user.userName,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          position: user.position,
          password,
          branchId: user.branchId,
          isAdmin: true,
        },
      });
    })
  );
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
