import { Request, Response } from "express";
import * as factureService from "../services/factureService";

export const getAllFactures = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const factures = await factureService.getAllFactures();
    res.status(200).json(factures);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getFactureById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facture = await factureService.getFactureById(req.params?.id);
    res.status(200).json(facture);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const createFacture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facture = await factureService.createFacture(req.body, req.user);
    res.status(201).json(facture);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const updateFacture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facture = await factureService.updateFacture(
      req.params?.id,
      req.body,
      req.user
    );
    res.status(200).json(facture);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteFacture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const facture = await factureService.deleteFacture(
      req.params?.id,
      req.user
    );
    res.status(200).json(facture);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
