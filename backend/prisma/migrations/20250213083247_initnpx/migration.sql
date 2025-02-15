/*
  Warnings:

  - You are about to drop the column `action` on the `auditFacture` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `auditFacture` table. All the data in the column will be lost.
  - You are about to drop the column `factureId` on the `auditFacture` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `auditFacture` table. All the data in the column will be lost.
  - Added the required column `actionType` to the `auditFacture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factureDate` to the `auditFacture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factureName` to the `auditFacture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `factureNumber` to the `auditFacture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auditFacture" DROP CONSTRAINT "auditFacture_factureId_fkey";

-- DropForeignKey
ALTER TABLE "auditFacture" DROP CONSTRAINT "auditFacture_userId_fkey";

-- AlterTable
ALTER TABLE "auditFacture" DROP COLUMN "action",
DROP COLUMN "date",
DROP COLUMN "factureId",
DROP COLUMN "userId",
ADD COLUMN     "actionType" "ActionType" NOT NULL,
ADD COLUMN     "dateUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "factureDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "factureName" TEXT NOT NULL,
ADD COLUMN     "factureNumber" TEXT NOT NULL;
