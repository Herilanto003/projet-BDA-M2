import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { User as UserType, UserLogin } from "../models/User";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as UserType;

  try {
    const existingUserName = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    if (existingUserName) {
      res.status(400).json({ error: "NAME ERROR" });
      return;
    }

    const existingUserEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserEmail) {
      res.status(400).json({ error: "EMAIL ERROR" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({
      user,
      status: "SUCCESS",
    });
    return;
  } catch (error: any) {
    res.status(500).json({ error: "SERVER ERROR" });
    console.log(error);
    return;
  }
};

export const registerForAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as UserType;

  try {
    const existingUserName = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    if (existingUserName) {
      res.status(400).json({ error: "NAME ERROR" });
      return;
    }

    const existingUserEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserEmail) {
      res.status(400).json({ error: "EMAIL ERROR" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    res.json({
      user,
      status: "SUCCESS",
    });
    return;
  } catch (error: any) {
    res.status(500).json({ error: "SERVER ERROR" });
    console.log(error);
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as UserLogin;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ error: "USER NOT FOUND" });
      return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ error: "INVALID PASSWORD" });
      return;
    }

    const token = generateToken({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    });

    res.json({
      email: user.email,
      name: user.name,
      userId: user.id,
      isAdmin: user.isAdmin,
      token,
    });

    return;
  } catch (error: any) {
    res.status(500).json({ error: "SERVER ERROR" });
    return;
  }
};
