/*
  Warnings:

  - You are about to drop the column `type` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the `broketag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "broketag" DROP CONSTRAINT "broketag_blogId_fkey";

-- DropForeignKey
ALTER TABLE "broketag" DROP CONSTRAINT "broketag_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "broketag" DROP CONSTRAINT "broketag_classId_fkey";

-- DropForeignKey
ALTER TABLE "broketag" DROP CONSTRAINT "broketag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "broketag" DROP CONSTRAINT "broketag_userprojectId_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "type";

-- DropTable
DROP TABLE "broketag";

-- CreateTable
CREATE TABLE "TagMorph" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "userprojectId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "TagMorph_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
