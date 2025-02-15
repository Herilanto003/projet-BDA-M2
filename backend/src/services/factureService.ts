import { PrismaClient } from "@prisma/client";
import { Facture } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllFactures = async (): Promise<Facture[]> => {
  try {
    return await prisma.facture.findMany();
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured while fetching factures");
  }
};

export const getFactureById = async (id: string): Promise<Facture | null> => {
  try {
    return await prisma.facture.findUnique({
      where: {
        factureNumber: id,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured while fetching facture");
  }
};

export const createFacture = async (
  facture: Facture,
  user: any
): Promise<Facture> => {
  console.log("user: ", user);
  try {
    await prisma.$executeRawUnsafe(
      `SET my.user_id = '${user?.userId?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_email = '${user?.userEmail?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_name = '${user?.userName?.toString()}';`
    );

    console.log(facture);
    return await prisma.facture.create({
      data: {
        factureNumber: facture.factureNumber,
        name: facture.name,
        amount: parseFloat(facture.amount.toString()),
        date: facture.date,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured while creating facture");
  }
};

export const updateFacture = async (
  id: string,
  facture: Facture,
  user: any
): Promise<Facture> => {
  try {
    await prisma.$executeRawUnsafe(
      `SET my.user_id = '${user?.userId?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_email = '${user?.userEmail?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_name = '${user?.userName?.toString()}';`
    );

    return await prisma.facture.update({
      where: {
        factureNumber: id,
      },
      data: facture,
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured while updating facture");
  }
};

export const deleteFacture = async (
  id: string,
  user: any
): Promise<Facture> => {
  try {
    await prisma.$executeRawUnsafe(
      `SET my.user_id = '${user?.userId?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_email = '${user?.userEmail?.toString()}';`
    );
    await prisma.$executeRawUnsafe(
      `SET my.user_name = '${user?.userName?.toString()}';`
    );

    return await prisma.facture.delete({
      where: {
        factureNumber: id,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("An error occured while deleting facture");
  }
};
