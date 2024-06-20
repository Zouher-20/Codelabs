/*
  Warnings:

  - You are about to drop the column `descraption` on the `ClassProject` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ClassProject` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `TagMorph` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_classId_fkey";

-- AlterTable
ALTER TABLE "ClassProject" DROP COLUMN "descraption",
DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Rom" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TagMorph" DROP COLUMN "classId";
