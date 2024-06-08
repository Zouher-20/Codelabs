/*
  Warnings:

  - The values [labsInClass] on the enum `NAMEPLAN` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `classRomId` on the `ClassProject` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ClassProject` table. All the data in the column will be lost.
  - You are about to drop the column `blogId` on the `TagMorph` table. All the data in the column will be lost.
  - Added the required column `description` to the `ClassRom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ClassRom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ClassRom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isTeacher` to the `MemberClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NAMEPLAN_new" AS ENUM ('labs', 'classes', 'studentsInClass', 'challenge', 'romsInClass', 'blogs');
ALTER TABLE "FeaturePlan" ALTER COLUMN "name" TYPE "NAMEPLAN_new" USING ("name"::text::"NAMEPLAN_new");
ALTER TYPE "NAMEPLAN" RENAME TO "NAMEPLAN_old";
ALTER TYPE "NAMEPLAN_new" RENAME TO "NAMEPLAN";
DROP TYPE "NAMEPLAN_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ClassProject" DROP CONSTRAINT "ClassProject_classRomId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_blogId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "status",
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "ClassProject" DROP COLUMN "classRomId",
DROP COLUMN "type",
ADD COLUMN     "romId" TEXT;

-- AlterTable
ALTER TABLE "ClassRom" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MemberClass" ADD COLUMN     "isTeacher" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "TagMorph" DROP COLUMN "blogId";

-- CreateTable
CREATE TABLE "Rom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classRomId" TEXT,

    CONSTRAINT "Rom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rom" ADD CONSTRAINT "Rom_classRomId_fkey" FOREIGN KEY ("classRomId") REFERENCES "ClassRom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
