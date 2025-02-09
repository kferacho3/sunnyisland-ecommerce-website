// src/lib/auth.ts
import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 12; // a strong salt factor
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
