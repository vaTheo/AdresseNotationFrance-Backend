-- CreateTable
CREATE TABLE "User" (
    "userUUID" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "AddressInfo" (
    "addressID" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "citycode" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "UserAddressInfo" (
    "userUUID" TEXT NOT NULL,
    "addressInfoId" TEXT NOT NULL,

    CONSTRAINT "UserAddressInfo_pkey" PRIMARY KEY ("userUUID","addressInfoId")
);

-- CreateTable
CREATE TABLE "jsonDataEau" (
    "id" TEXT NOT NULL,
    "addressID" INTEGER NOT NULL,
    "eauPotable" JSONB,
    "DataSourcesID" TEXT NOT NULL,
    "coursEau" JSONB,

    CONSTRAINT "jsonDataEau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jsonDataGeorisque" (
    "id" TEXT NOT NULL,
    "AZIData" JSONB,
    "CatnatData" JSONB,
    "InstallationsClasseesData" JSONB,
    "MVTData" JSONB,
    "RadonData" JSONB,
    "RisquesData" JSONB,
    "SISData" JSONB,
    "TRIData" JSONB,
    "ZonageSismiqueData" JSONB,
    "DataSourcesID" TEXT NOT NULL,

    CONSTRAINT "jsonDataGeorisque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllRatings" (
    "id" TEXT NOT NULL,
    "addressID" TEXT NOT NULL,
    "eauPotable" INTEGER,
    "coursEau" INTEGER,
    "AZIData" INTEGER,
    "CatnatData" INTEGER,
    "InstallationsClasseesData" INTEGER,
    "MVTData" INTEGER,
    "RadonData" INTEGER,
    "RisquesData" INTEGER,
    "SISData" INTEGER,
    "TRIData" INTEGER,
    "ZonageSismiqueData" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DataSourcesID" TEXT,

    CONSTRAINT "AllRatings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userUUID_key" ON "User"("userUUID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AddressInfo_addressID_key" ON "AddressInfo"("addressID");

-- CreateIndex
CREATE UNIQUE INDEX "jsonDataEau_addressID_key" ON "jsonDataEau"("addressID");

-- CreateIndex
CREATE UNIQUE INDEX "AllRatings_addressID_key" ON "AllRatings"("addressID");

-- AddForeignKey
ALTER TABLE "UserAddressInfo" ADD CONSTRAINT "UserAddressInfo_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("userUUID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddressInfo" ADD CONSTRAINT "UserAddressInfo_addressInfoId_fkey" FOREIGN KEY ("addressInfoId") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jsonDataEau" ADD CONSTRAINT "jsonDataEau_DataSourcesID_fkey" FOREIGN KEY ("DataSourcesID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jsonDataGeorisque" ADD CONSTRAINT "jsonDataGeorisque_DataSourcesID_fkey" FOREIGN KEY ("DataSourcesID") REFERENCES "AddressInfo"("addressID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllRatings" ADD CONSTRAINT "AllRatings_DataSourcesID_fkey" FOREIGN KEY ("DataSourcesID") REFERENCES "AddressInfo"("addressID") ON DELETE SET NULL ON UPDATE CASCADE;
