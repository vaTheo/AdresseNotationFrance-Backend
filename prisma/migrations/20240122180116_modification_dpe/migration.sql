/*
  Warnings:

  - You are about to drop the column `DPEHabitat` on the `AllRatings` table. All the data in the column will be lost.
  - You are about to drop the column `DPEHabitat` on the `jsonDataDPE` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AllRatings" DROP COLUMN "DPEHabitat",
ADD COLUMN     "DPEHabitatExistant" INTEGER,
ADD COLUMN     "DPEHabitatNeuf" INTEGER;

-- AlterTable
ALTER TABLE "jsonDataDPE" DROP COLUMN "DPEHabitat",
ADD COLUMN     "DPEHabitatExistant" JSONB,
ADD COLUMN     "DPEHabitatNeuf" JSONB;
