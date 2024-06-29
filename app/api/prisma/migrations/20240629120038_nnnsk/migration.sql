/*
  Warnings:

  - You are about to drop the column `challengeParticipationId` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `classProjectId` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `tamblateId` on the `Lab` table. All the data in the column will be lost.
  - You are about to drop the column `userprojectId` on the `Lab` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labId]` on the table `ChallengeParticipation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labId]` on the table `ClassProject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameTemplate]` on the table `Tamblate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labId]` on the table `Tamblate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[labId]` on the table `UserProject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labId` to the `ChallengeParticipation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labId` to the `ClassProject` table without a default value. This is not possible if the table is not empty.
  - Made the column `jsonFile` on table `Lab` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `labId` to the `Tamblate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labId` to the `UserProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_challengeParticipationId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_classProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_tamblateId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_userprojectId_fkey";

-- AlterTable
ALTER TABLE "ChallengeParticipation" ADD COLUMN     "labId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassProject" ADD COLUMN     "labId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassRom" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Lab" DROP COLUMN "challengeParticipationId",
DROP COLUMN "classProjectId",
DROP COLUMN "tamblateId",
DROP COLUMN "userprojectId",
ALTER COLUMN "jsonFile" SET NOT NULL;

-- AlterTable
ALTER TABLE "Tamblate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "labId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "imageTemplate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "position" TEXT;

-- AlterTable
ALTER TABLE "UserProject" ADD COLUMN     "clone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "labId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "veiw" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userprojectId" TEXT,
    "blogId" TEXT,
    "challengeId" TEXT,

    CONSTRAINT "veiw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChallengeParticipation_labId_key" ON "ChallengeParticipation"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassProject_labId_key" ON "ClassProject"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "Tamblate_nameTemplate_key" ON "Tamblate"("nameTemplate");

-- CreateIndex
CREATE UNIQUE INDEX "Tamblate_labId_key" ON "Tamblate"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProject_labId_key" ON "UserProject"("labId");

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeParticipation" ADD CONSTRAINT "ChallengeParticipation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tamblate" ADD CONSTRAINT "Tamblate_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiw" ADD CONSTRAINT "veiw_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiw" ADD CONSTRAINT "veiw_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiw" ADD CONSTRAINT "veiw_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiw" ADD CONSTRAINT "veiw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
