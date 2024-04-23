/*
  Warnings:

  - You are about to alter the column `value` on the `FeaturePlan` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `userId` on the `Plan` table. All the data in the column will be lost.
  - The `type` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Code` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `difficulty` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isComplete` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `FeaturePlan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `jsonFile` to the `Lab` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DIFFICULTTYPE" AS ENUM ('easy', 'difficult', 'Medium');

-- CreateEnum
CREATE TYPE "NAMEPLAN" AS ENUM ('labs', 'classes', 'studentsInClass', 'labsInClass', 'challenge');

-- DropForeignKey
ALTER TABLE "Code" DROP CONSTRAINT "Code_labId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userId_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_userprojectId_fkey";

-- DropIndex
DROP INDEX "Plan_userId_key";

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "difficulty" "DIFFICULTTYPE" NOT NULL,
ADD COLUMN     "duration" TIMESTAMP(3),
ADD COLUMN     "isComplete" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "ClassProject" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "FeaturePlan" DROP COLUMN "name",
ADD COLUMN     "name" "NAMEPLAN" NOT NULL,
ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Lab" ADD COLUMN     "jsonFile" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "userId",
DROP COLUMN "type",
ADD COLUMN     "type" TEXT,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Code";

-- DropTable
DROP TABLE "tag";

-- CreateTable
CREATE TABLE "PlanSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagename" TEXT NOT NULL,
    "tagtype" "TAGTYPE",

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "broketag" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "userprojectId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "broketag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanSubscription_userId_key" ON "PlanSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSubscription_planId_key" ON "PlanSubscription"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagename_key" ON "Tag"("tagename");

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broketag" ADD CONSTRAINT "broketag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broketag" ADD CONSTRAINT "broketag_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broketag" ADD CONSTRAINT "broketag_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broketag" ADD CONSTRAINT "broketag_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "broketag" ADD CONSTRAINT "broketag_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
