/*
  Warnings:

  - The primary key for the `Facture` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Facture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Facture" DROP CONSTRAINT "Facture_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Facture_pkey" PRIMARY KEY ("factureNumber");
