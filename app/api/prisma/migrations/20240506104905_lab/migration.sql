/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "imageUrl",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Star" ADD COLUMN     "challengeId" TEXT,
ALTER COLUMN "userprojectId" DROP NOT NULL,
ALTER COLUMN "blogId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
