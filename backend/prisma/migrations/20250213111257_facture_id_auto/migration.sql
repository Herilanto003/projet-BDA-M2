/*
  Warnings:

  - The primary key for the `Facture` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Facture" DROP CONSTRAINT "Facture_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Facture_pkey" PRIMARY KEY ("id");
