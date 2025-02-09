// src/app/api/auth/verify-email.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  
  const { email, code } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const record = await prisma.userVerification.findFirst({
    where: {
      userId: user.id,
      code,
      expiresAt: { gt: new Date() },
    },
  });

  if (!record) return res.status(400).json({ message: "Invalid or expired verification code" });

  // Mark user as verified
  await prisma.user.update({ where: { id: user.id }, data: { verified: true } });
  // Optionally remove the verification record
  await prisma.userVerification.deleteMany({ where: { userId: user.id } });

  res.status(200).json({ message: "Email verified successfully" });
}
