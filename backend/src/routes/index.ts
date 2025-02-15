import { Router } from "express";
import authRoutes from "../routes/authRoutes";
import factureRoutes from "../routes/factureRoutes";
import { authenticate } from "../middlewares/authMiddleware";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/factures", authenticate, factureRoutes);

export default routes;
