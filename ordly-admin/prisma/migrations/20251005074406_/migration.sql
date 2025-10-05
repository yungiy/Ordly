/*
  Warnings:

  - You are about to drop the column `imageBase64` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."MenuItem" DROP COLUMN "imageBase64",
ADD COLUMN     "imageUrl" TEXT;
