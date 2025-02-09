// src/app/api/auth/register.ts
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function verifyCaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();
  return data.success;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { firstName, lastName, email, password, confirmPassword, captchaToken } = req.body;

  // 1. Validate input
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (!await verifyCaptcha(captchaToken)) {
    return res.status(400).json({ message: "Captcha verification failed" });
  }

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // 3. Hash the password
  const hashedPassword = await hashPassword(password);

  // 4. Create user record (initially unverified)
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false,
    },
  });

  // 5. Generate a 6-digit verification code and store it with expiration (3 minutes)
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.userVerification.create({
    data: {
      userId: user.id,
      code: verificationCode,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
    },
  });

  // 6. Send the verification email (using Nodemailer; configure with your email service)
  const transporter = nodemailer.createTransport({
    service: "SendGrid", // or another service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "no-reply@sunnyislandpepper.com",
    to: email,
    subject: "Verify your email for Sunny Island",
    text: `Your verification code is ${verificationCode}. It expires in 3 minutes.`,
  });

  res.status(201).json({ message: "User registered. Please verify your email." });
}
