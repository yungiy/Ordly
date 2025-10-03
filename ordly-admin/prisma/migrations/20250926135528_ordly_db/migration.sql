/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Coupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coupon_id` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Coupon` table. All the data in the column will be lost.
  - The primary key for the `MenuItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_id` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `menu_item_id` on the `MenuItem` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `menu_item_id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `order_item_id` on the `OrderItem` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `order_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reservation_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Reservation` table. All the data in the column will be lost.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Store` table. All the data in the column will be lost.
  - The primary key for the `UsedCoupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `coupon_id` on the `UsedCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `UsedCoupon` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `UsedCoupon` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `storeId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Coupon` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `storeId` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `discountType` on the `Coupon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `categoryId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MenuItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `storeId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `OrderItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `menuItemId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `Reservation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `storeId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `id` was added to the `Store` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `couponId` to the `UsedCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `UsedCoupon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MenuStatus" AS ENUM ('AVAILABLE', 'SOLDOUT');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "public"."DiscountType" AS ENUM ('FIXED_AMOUNT', 'PERCENTAGE');

-- CreateEnum
CREATE TYPE "public"."ReservationStatus" AS ENUM ('REQUESTED', 'CONFIRMED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Coupon" DROP CONSTRAINT "Coupon_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."MenuItem" DROP CONSTRAINT "MenuItem_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_menu_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_coupon_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_order_id_fkey";

-- DropIndex
DROP INDEX "public"."Payment_order_id_key";

-- DropIndex
DROP INDEX "public"."UsedCoupon_order_id_key";

-- AlterTable
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "category_id",
DROP COLUMN "store_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Coupon" DROP CONSTRAINT "Coupon_pkey",
DROP COLUMN "coupon_id",
DROP COLUMN "store_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL,
DROP COLUMN "discountType",
ADD COLUMN     "discountType" "public"."DiscountType" NOT NULL,
ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."MenuItem" DROP CONSTRAINT "MenuItem_pkey",
DROP COLUMN "category_id",
DROP COLUMN "isAvailable",
DROP COLUMN "menu_item_id",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" "public"."MenuStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "order_id",
DROP COLUMN "store_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "menu_item_id",
DROP COLUMN "order_id",
DROP COLUMN "order_item_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "menuItemId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "order_id",
DROP COLUMN "payment_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."PaymentStatus" NOT NULL,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_pkey",
DROP COLUMN "reservation_id",
DROP COLUMN "store_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "storeId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."ReservationStatus" NOT NULL,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "password",
DROP COLUMN "store_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_pkey",
DROP COLUMN "coupon_id",
DROP COLUMN "order_id",
ADD COLUMN     "couponId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD CONSTRAINT "UsedCoupon_pkey" PRIMARY KEY ("orderId", "couponId");

-- DropTable
DROP TABLE "public"."Admin";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "public"."User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "public"."Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "UsedCoupon_orderId_key" ON "public"."UsedCoupon"("orderId");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "public"."MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Coupon" ADD CONSTRAINT "Coupon_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsedCoupon" ADD CONSTRAINT "UsedCoupon_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsedCoupon" ADD CONSTRAINT "UsedCoupon_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "public"."Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
