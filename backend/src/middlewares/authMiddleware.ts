import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  const decoded: any = verifyToken(token);

  if (!decoded) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }

  console.log(decoded);
  // await prisma.$executeRaw`SET my.user_id = \"${decoded?.userId}\";`;
  // await prisma.$executeRaw`SET my.user_email = \"${decoded?.userEmail}\";`;
  // await prisma.$executeRaw`SET my.user_name = \"${decoded?.userName}\";`;

  req.user = decoded; // Ajoute les informations de l'utilisateur au request
  next();
};
