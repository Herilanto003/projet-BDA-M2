import { Request, Response } from "express";
import * as auditFactureService from "../services/auditFactureSerice";

export const getAllAuditFacture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auditFactures = await auditFactureService.getAllAuditFacture();
    res.status(200).json(auditFactures);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getAllAuditFactureBetweenTwoDate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const auditFacturesBetweenToDates =
      await auditFactureService.getAllAuditFactureBetweenTwoDate(
        req.body?.startDate,
        req.body?.endDate
      );
    res.status(200).json(auditFacturesBetweenToDates);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getTotalActions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totals = await auditFactureService.getTotalActions();
    // console.log("totals", totals);

    res.status(200).json(totals);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
