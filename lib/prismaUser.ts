import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";

export async function getOrCreateUser() {
  const { userId } = auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { clerkId: userId },
    });
  }
  return user;
}
