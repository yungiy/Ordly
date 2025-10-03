/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."MenuItem" DROP COLUMN "imageUrl",
ADD COLUMN     "imageBase64" TEXT;
