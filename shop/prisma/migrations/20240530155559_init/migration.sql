-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Main', 'DeliveryManager', 'SuperVisor', 'SalesMan');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'BYN', 'RUB');

-- CreateTable
CREATE TABLE "Shop" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "hasDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Good" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(50) NOT NULL,
    "description" VARCHAR(250) NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "discount" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "hasDeleted" BOOLEAN NOT NULL DEFAULT false,
    "shopId" UUID NOT NULL,

    CONSTRAINT "Good_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userAppId" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "hasDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnShop" (
    "shopId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "hasDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserOnShop_pkey" PRIMARY KEY ("shopId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_title_key" ON "Shop"("title");

-- AddForeignKey
ALTER TABLE "Good" ADD CONSTRAINT "Good_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnShop" ADD CONSTRAINT "UserOnShop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnShop" ADD CONSTRAINT "UserOnShop_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
