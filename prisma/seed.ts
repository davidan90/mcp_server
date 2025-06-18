import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", isActive: true },
      { name: "Bob", email: "bob@example.com", isActive: false },
      { name: "Charlie", email: "charlie@example.com", isActive: true },
    ],
  });

  console.log("Seed data inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
