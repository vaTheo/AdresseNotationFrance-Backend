/*
  Warnings:

  - The primary key for the `AllRatings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DataSourcesID` on the `AllRatings` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `AllRatings` table. All the data in the column will be lost.
  - The primary key for the `jsonDataEau` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DataSourcesID` on the `jsonDataEau` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `jsonDataEau` table. All the data in the column will be lost.
  - The primary key for the `jsonDataGeorisque` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DataSourcesID` on the `jsonDataGeorisque` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `jsonDataGeorisque` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressID]` on the table `jsonDataGeorisque` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressID` to the `jsonDataGeorisque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AllRatings" DROP CONSTRAINT "AllRatings_DataSourcesID_fkey";

-- DropForeignKey
ALTER TABLE "jsonDataEau" DROP CONSTRAINT "jsonDataEau_DataSourcesID_fkey";

-- DropForeignKey
ALTER TABLE "jsonDataGeorisque" DROP CONSTRAINT "jsonDataGeorisque_DataSourcesID_fkey";

-- AlterTable
ALTER TABLE "AllRatings" DROP CONSTRAINT "AllRatings_pkey",
DROP COLUMN "DataSourcesID",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "jsonDataEau" DROP CONSTRAINT "jsonDataEau_pkey",
DROP COLUMN "DataSourcesID",
DROP COLUMN "id",
ALTER COLUMN "addressID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "jsonDataGeorisque" DROP CONSTRAINT "jsonDataGeorisque_pkey",
DROP COLUMN "DataSourcesID",
DROP COLUMN "id",
ADD COLUMN     "addressID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "jsonDataGeorisque_addressID_key" ON "jsonDataGeorisque"("addressID");

-- AddForeignKey
ALTER TABLE "jsonDataEau" ADD CONSTRAINT "jsonDataEau_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jsonDataGeorisque" ADD CONSTRAINT "jsonDataGeorisque_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllRatings" ADD CONSTRAINT "AllRatings_addressID_fkey" FOREIGN KEY ("addressID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;
