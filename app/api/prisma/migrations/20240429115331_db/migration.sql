/*
  Warnings:

  - You are about to drop the column `type` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `name` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PlanSubscription_planId_key";

-- AlterTable
ALTER TABLE "Challenge" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "resources" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
