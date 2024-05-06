/*
  Warnings:

  - The primary key for the `Tamblate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `type` on the `UserProject` table. All the data in the column will be lost.
  - Added the required column `subtitle` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeParticipation" DROP CONSTRAINT "ChallengeParticipation_userId_fkey";

-- DropForeignKey
ALTER TABLE "ClassProject" DROP CONSTRAINT "ClassProject_classRomId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userprojectId_fkey";

-- DropForeignKey
ALTER TABLE "EditorConfig" DROP CONSTRAINT "EditorConfig_userId_fkey";

-- DropForeignKey
ALTER TABLE "FeaturePlan" DROP CONSTRAINT "FeaturePlan_planId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackProjct" DROP CONSTRAINT "FeedbackProjct_classProjectId_fkey";

-- DropForeignKey
ALTER TABLE "FeedbackProjct" DROP CONSTRAINT "FeedbackProjct_memberClassId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_challengeParticipationId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_classProjectId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_tamblateId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_userprojectId_fkey";

-- DropForeignKey
ALTER TABLE "MemberClass" DROP CONSTRAINT "MemberClass_classRomId_fkey";

-- DropForeignKey
ALTER TABLE "MemberClass" DROP CONSTRAINT "MemberClass_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlanSubscription" DROP CONSTRAINT "PlanSubscription_planId_fkey";

-- DropForeignKey
ALTER TABLE "PlanSubscription" DROP CONSTRAINT "PlanSubscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_userId_fkey";

-- DropForeignKey
ALTER TABLE "Star" DROP CONSTRAINT "Star_userprojectId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_blogId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_classId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagMorph" DROP CONSTRAINT "TagMorph_userprojectId_fkey";

-- DropForeignKey
ALTER TABLE "UserProject" DROP CONSTRAINT "UserProject_userId_fkey";

-- DropForeignKey
ALTER TABLE "Verified" DROP CONSTRAINT "Verified_userId_fkey";

-- DropIndex
DROP INDEX "Lab_tamblateId_key";

-- AlterTable
ALTER TABLE "Lab" ALTER COLUMN "tamblateId" DROP NOT NULL,
ALTER COLUMN "tamblateId" SET DATA TYPE TEXT,
ALTER COLUMN "userprojectId" DROP NOT NULL,
ALTER COLUMN "classProjectId" DROP NOT NULL,
ALTER COLUMN "challengeParticipationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TagMorph" ALTER COLUMN "userprojectId" DROP NOT NULL,
ALTER COLUMN "challengeId" DROP NOT NULL,
ALTER COLUMN "classId" DROP NOT NULL,
ALTER COLUMN "blogId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tamblate" DROP CONSTRAINT "Tamblate_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Tamblate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Tamblate_id_seq";

-- AlterTable
ALTER TABLE "UserProject" DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Verified" ADD CONSTRAINT "Verified_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorConfig" ADD CONSTRAINT "EditorConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturePlan" ADD CONSTRAINT "FeaturePlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_classRomId_fkey" FOREIGN KEY ("classRomId") REFERENCES "ClassRom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_classId_fkey" FOREIGN KEY ("classId") REFERENCES "ClassProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeParticipation" ADD CONSTRAINT "ChallengeParticipation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeParticipation" ADD CONSTRAINT "ChallengeParticipation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_tamblateId_fkey" FOREIGN KEY ("tamblateId") REFERENCES "Tamblate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_challengeParticipationId_fkey" FOREIGN KEY ("challengeParticipationId") REFERENCES "ChallengeParticipation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_classProjectId_fkey" FOREIGN KEY ("classProjectId") REFERENCES "ClassProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Star" ADD CONSTRAINT "Star_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberClass" ADD CONSTRAINT "MemberClass_classRomId_fkey" FOREIGN KEY ("classRomId") REFERENCES "ClassRom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberClass" ADD CONSTRAINT "MemberClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackProjct" ADD CONSTRAINT "FeedbackProjct_classProjectId_fkey" FOREIGN KEY ("classProjectId") REFERENCES "ClassProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackProjct" ADD CONSTRAINT "FeedbackProjct_memberClassId_fkey" FOREIGN KEY ("memberClassId") REFERENCES "MemberClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;
