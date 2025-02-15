import { Router } from "express";
import * as factureController from "../controllers/factureController";

const router = Router();

router.get("/", factureController.getAllFactures);
router.get("/:id", factureController.getFactureById);
router.post("/", factureController.createFacture);
router.put("/:id", factureController.updateFacture);
router.delete("/:id", factureController.deleteFacture);

export default router;
