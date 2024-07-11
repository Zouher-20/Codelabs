/*
  Warnings:

  - You are about to drop the column `tag` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `tagtype` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "tag";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "tagtype",
ADD COLUMN     "isChanllange" BOOLEAN;

-- AlterTable
ALTER TABLE "TagMorph" ADD COLUMN     "challengeId" TEXT;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
