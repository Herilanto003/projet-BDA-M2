/*
  Warnings:

  - The primary key for the `auditFacture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `auditFacture` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "auditFacture" DROP CONSTRAINT "auditFacture_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "auditFacture_pkey" PRIMARY KEY ("id");
