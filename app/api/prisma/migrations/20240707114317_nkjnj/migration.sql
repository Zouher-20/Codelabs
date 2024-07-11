/*
  Warnings:

  - You are about to drop the column `challengeId` on the `Star` table. All the data in the column will be lost.
  - You are about to drop the column `challengeId` on the `TagMorph` table. All the data in the column will be lost.
  - You are about to drop the column `challengeId` on the `veiw` table. All the data in the column will be lost.
  - You are about to drop the `ChallengeParticipation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tag` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_labId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "veiw" DROP CONSTRAINT "veiw_challengeId_fkey";

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "tag" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Star" DROP COLUMN "challengeId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "TagMorph" DROP COLUMN "challengeId";

-- AlterTable
ALTER TABLE "veiw" DROP COLUMN "challengeId";

-- DropTable
DROP TABLE "ChallengeParticipation";
