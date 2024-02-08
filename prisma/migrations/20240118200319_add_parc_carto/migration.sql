/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AllRatings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AllRatings" DROP COLUMN "createdAt",
ADD COLUMN     "naturaHabitat" INTEGER,
ADD COLUMN     "naturaOiseaux" INTEGER,
ADD COLUMN     "pn" INTEGER,
ADD COLUMN     "pnr" INTEGER,
ADD COLUMN     "reatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rnc" INTEGER,
ADD COLUMN     "rncf" INTEGER,
ADD COLUMN     "rnn" INTEGER,
ADD COLUMN     "znieff1" INTEGER,
ADD COLUMN     "znieff2" INTEGER;

-- CreateTable
CREATE TABLE "jsonDataParcCarto" (
    "addressID" TEXT NOT NULL,
    "naturaHabitat" JSONB,
    "naturaOiseaux" JSONB,
    "rnc" JSONB,
    "rnn" JSONB,
    "znieff1" JSONB,
    "znieff2" JSONB,
    "pn" JSONB,
    "pnr" JSONB,
    "rncf" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "jsonDataParcCarto_addressID_key" ON "jsonDataParcCarto"("addressID");

-- AddForeignKey
ALTER TABLE "jsonDataParcCarto" ADD CONSTRAINT "jsonDataParcCarto_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;
