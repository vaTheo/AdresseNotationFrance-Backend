-- AlterTable
ALTER TABLE "AllRatings" ADD COLUMN     "DPEHabitat" INTEGER,
ADD COLUMN     "DPETertiaire" INTEGER;

-- CreateTable
CREATE TABLE "jsonDataDPE" (
    "addressID" TEXT NOT NULL,
    "DPEHabitat" JSONB,
    "DPETertiaire" JSONB
);

-- CreateIndex
CREATE UNIQUE INDEX "jsonDataDPE_addressID_key" ON "jsonDataDPE"("addressID");

-- AddForeignKey
ALTER TABLE "jsonDataDPE" ADD CONSTRAINT "jsonDataDPE_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;
