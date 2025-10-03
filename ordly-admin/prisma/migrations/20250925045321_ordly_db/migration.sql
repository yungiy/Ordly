/*
  Warnings:

  - You are about to drop the column `table_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `table_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `AuthCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCoupon` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_table_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_table_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Table" DROP CONSTRAINT "Table_store_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_coupon_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserCoupon" DROP CONSTRAINT "UserCoupon_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "table_id",
DROP COLUMN "user_id",
ADD COLUMN     "store_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reservation" DROP COLUMN "table_id",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "public"."Store" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."AuthCode";

-- DropTable
DROP TABLE "public"."Table";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserCoupon";

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "public"."Store"("name");

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;
