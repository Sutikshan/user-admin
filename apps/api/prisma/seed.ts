// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const user1 = await prisma.user.upsert({
    where: { email: "s.anand.dubey@gmail.com" },
    update: {},
    create: {
      name: "Anand",
      email: "s.anand.dubey@gmail.com",
      password: "",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "tina.sd7@gmail.com" },
    update: {},
    create: {
      name: "Tina",
      email: "tina.sd7@gmail.com",
      password: "",
    },
  });

  console.log({ user1, user2 });
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
