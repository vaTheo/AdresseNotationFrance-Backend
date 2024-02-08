-- AlterTable
ALTER TABLE "AllRatings" ADD COLUMN     "DPEHabitatExistantAvant2021" INTEGER,
ADD COLUMN     "DPETertiaireAvant2021" INTEGER;

-- AlterTable
ALTER TABLE "jsonDataDPE" ADD COLUMN     "DPEHabitatExistantAvant2021" JSONB,
ADD COLUMN     "DPETertiaireAvant2021" JSONB;
