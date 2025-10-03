/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `Coupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Coupon` table. All the data in the column will be lost.
  - The primary key for the `MenuItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `MenuItem` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `menuItemId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderItem` table. All the data in the column will be lost.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reservation` table. All the data in the column will be lost.
  - The primary key for the `Store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Store` table. All the data in the column will be lost.
  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Table` table. All the data in the column will be lost.
  - The primary key for the `UsedCoupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `couponId` on the `UsedCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `UsedCoupon` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserCoupon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `couponId` on the `UserCoupon` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserCoupon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id]` on the table `UsedCoupon` will be added. If there are existing duplicate values, this will fail.
  - The required column `category_id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `store_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - The required column `coupon_id` was added to the `Coupon` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `store_id` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - The required column `menu_item_id` was added to the `MenuItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `order_id` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `table_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_item_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - The required column `order_item_id` was added to the `OrderItem` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `order_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - The required column `payment_id` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `reservation_id` was added to the `Reservation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `store_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - The required column `store_id` was added to the `Store` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `store_id` to the `Table` table without a default value. This is not possible if the table is not empty.
  - The required column `table_id` was added to the `Table` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `coupon_id` to the `UsedCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `UsedCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `coupon_id` to the `UserCoupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserCoupon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Coupon" DROP CONSTRAINT "Coupon_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MenuItem" DROP CONSTRAINT "MenuItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_tableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_tableId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Table" DROP CONSTRAINT "Table_storeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_couponId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_couponId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_userId_fkey";

-- DropIndex
DROP INDEX "public"."Payment_orderId_key";

-- DropIndex
DROP INDEX "public"."UsedCoupon_orderId_key";

-- AlterTable
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "id",
DROP COLUMN "storeId",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id");

-- AlterTable
ALTER TABLE "public"."Coupon" DROP CONSTRAINT "Coupon_pkey",
DROP COLUMN "id",
DROP COLUMN "storeId",
ADD COLUMN     "coupon_id" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD CONSTRAINT "Coupon_pkey" PRIMARY KEY ("coupon_id");

-- AlterTable
ALTER TABLE "public"."MenuItem" DROP CONSTRAINT "MenuItem_pkey",
DROP COLUMN "categoryId",
DROP COLUMN "id",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "menu_item_id" TEXT NOT NULL,
ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("menu_item_id");

-- AlterTable
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
DROP COLUMN "tableId",
DROP COLUMN "userId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "table_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id");

-- AlterTable
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "id",
DROP COLUMN "menuItemId",
DROP COLUMN "orderId",
ADD COLUMN     "menu_item_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "order_item_id" TEXT NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("order_item_id");

-- AlterTable
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_pkey",
DROP COLUMN "id",
DROP COLUMN "orderId",
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "payment_id" TEXT NOT NULL,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id");

-- AlterTable
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_pkey",
DROP COLUMN "id",
DROP COLUMN "storeId",
DROP COLUMN "tableId",
DROP COLUMN "userId",
ADD COLUMN     "reservation_id" TEXT NOT NULL,
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD COLUMN     "table_id" TEXT,
ADD COLUMN     "user_id" TEXT,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservation_id");

-- AlterTable
ALTER TABLE "public"."Store" DROP CONSTRAINT "Store_pkey",
DROP COLUMN "id",
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id");

-- AlterTable
ALTER TABLE "public"."Table" DROP CONSTRAINT "Table_pkey",
DROP COLUMN "id",
DROP COLUMN "storeId",
ADD COLUMN     "store_id" TEXT NOT NULL,
ADD COLUMN     "table_id" TEXT NOT NULL,
ADD CONSTRAINT "Table_pkey" PRIMARY KEY ("table_id");

-- AlterTable
ALTER TABLE "public"."UsedCoupon" DROP CONSTRAINT "UsedCoupon_pkey",
DROP COLUMN "couponId",
DROP COLUMN "orderId",
ADD COLUMN     "coupon_id" TEXT NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD CONSTRAINT "UsedCoupon_pkey" PRIMARY KEY ("order_id", "coupon_id");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "role",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- AlterTable
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_pkey",
DROP COLUMN "couponId",
DROP COLUMN "userId",
ADD COLUMN     "coupon_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD CONSTRAINT "UserCoupon_pkey" PRIMARY KEY ("user_id", "coupon_id");

-- CreateTable
CREATE TABLE "public"."AuthCode" (
    "code_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires_at" TIMESTAMPTZ(3) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthCode_pkey" PRIMARY KEY ("code_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthCode_code_key" ON "public"."AuthCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_order_id_key" ON "public"."Payment"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "UsedCoupon_order_id_key" ON "public"."UsedCoupon"("order_id");

-- AddForeignKey
ALTER TABLE "public"."Table" ADD CONSTRAINT "Table_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MenuItem" ADD CONSTRAINT "MenuItem_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."Table"("table_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "public"."MenuItem"("menu_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Coupon" ADD CONSTRAINT "Coupon_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCoupon" ADD CONSTRAINT "UserCoupon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCoupon" ADD CONSTRAINT "UserCoupon_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."Coupon"("coupon_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsedCoupon" ADD CONSTRAINT "UsedCoupon_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UsedCoupon" ADD CONSTRAINT "UsedCoupon_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "public"."Coupon"("coupon_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "public"."Table"("table_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
