import { Router } from "express";
import * as audiFactureController from "../controllers/auditFactureController";

const router = Router();

router.get("/", audiFactureController.getAllAuditFacture);
router.post(
  "/between-two-dates",
  audiFactureController.getAllAuditFactureBetweenTwoDate
);
router.get("/total-actions", audiFactureController.getTotalActions);

export default router;
