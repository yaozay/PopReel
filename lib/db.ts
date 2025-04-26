import { PrismaClient }  from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = prisma;
}

export default global.prisma as PrismaClient;
