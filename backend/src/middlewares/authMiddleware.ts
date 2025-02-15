import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  const decoded: any = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid token" });
  }

  console.log(decoded);
  // await prisma.$executeRaw`SET my.user_id = \"${decoded?.userId}\";`;
  // await prisma.$executeRaw`SET my.user_email = \"${decoded?.userEmail}\";`;
  // await prisma.$executeRaw`SET my.user_name = \"${decoded?.userName}\";`;

  req.user = decoded; // Ajoute les informations de l'utilisateur au request
  next();
};
