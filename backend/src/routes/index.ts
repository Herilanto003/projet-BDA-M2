import { Router } from "express";
import authRoutes from "../routes/authRoutes";

const routes = Router();

routes.use("/auth", authRoutes);

export default routes;
