// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// optional: attach prisma to the global object in development
// to avoid hot-reload issues in Next.js
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (!global.prisma) {
  global.prisma = prisma;
}

export default global.prisma as PrismaClient;
