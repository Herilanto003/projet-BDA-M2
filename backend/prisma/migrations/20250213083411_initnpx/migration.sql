/*
  Warnings:

  - Added the required column `userEmail` to the `auditFacture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `auditFacture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `auditFacture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auditFacture" ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
