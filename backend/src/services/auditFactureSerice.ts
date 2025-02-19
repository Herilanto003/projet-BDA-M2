import { PrismaClient, auditFacture } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAuditFacture = async (): Promise<auditFacture[]> => {
  try {
    return await prisma.auditFacture.findMany({
      orderBy: {
        id: "desc",
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const getAllAuditFactureBetweenTwoDate = async (
  startDate: Date | string,
  endDate: Date | string
): Promise<auditFacture[]> => {
  try {
    return await prisma.auditFacture.findMany({
      where: {
        dateUpdate: {
          gte: new Date(startDate), // >= startDate
          lte: new Date(endDate), // <= endDate
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Server Error");
  }
};

export const getTotalActions = async (): Promise<
  { actionType: string; count: number }[]
> => {
  try {
    const result = await prisma.auditFacture.groupBy({
      by: ["actionType"],
      _count: {
        actionType: true,
      },
    });

    return result.map(({ actionType, _count }) => ({
      actionType,
      count: _count.actionType,
    }));
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Server Error");
  }
};
