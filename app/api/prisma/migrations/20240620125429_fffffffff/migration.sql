-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DIFFICULTTYPE" AS ENUM ('easy', 'difficult', 'Medium');

-- CreateEnum
CREATE TYPE "NAMEPLAN" AS ENUM ('labs', 'classes', 'studentsInClass', 'challenge', 'romsInClass', 'blogs');

-- CreateEnum
CREATE TYPE "PLANTYPE" AS ENUM ('free', 'plus', 'custom', 'premium');

-- CreateEnum
CREATE TYPE "TAGTYPE" AS ENUM ('challenge', 'normal', 'class');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "typeUser" TEXT,
    "userImage" TEXT,
    "planEndDate" TIMESTAMP(3),
    "inActive" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verified" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Verified_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "Feedback" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorConfig" (
    "id" TEXT NOT NULL,
    "config" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EditorConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "price" INTEGER NOT NULL,
    "duration" TEXT,
    "subtitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeaturePlan" (
    "id" SERIAL NOT NULL,
    "name" "NAMEPLAN" NOT NULL,
    "value" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "FeaturePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassProject" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "romId" TEXT,
    "memberClassId" TEXT,

    CONSTRAINT "ClassProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "classRomId" TEXT,

    CONSTRAINT "Rom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassRom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ClassRom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "tagename" TEXT NOT NULL,
    "tagtype" "TAGTYPE",

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagMorph" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "userprojectId" TEXT,
    "challengeId" TEXT,

    CONSTRAINT "TagMorph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isComplete" BOOLEAN NOT NULL,
    "difficulty" "DIFFICULTTYPE" NOT NULL,
    "description" TEXT,
    "resources" TEXT,
    "endAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeParticipation" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChallengeParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab" (
    "id" TEXT NOT NULL,
    "tamblateId" TEXT,
    "jsonFile" TEXT,
    "userprojectId" TEXT,
    "classProjectId" TEXT,
    "challengeParticipationId" TEXT,

    CONSTRAINT "Lab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tamblate" (
    "id" TEXT NOT NULL,
    "nameTemplate" TEXT NOT NULL,
    "imageTemplate" TEXT NOT NULL,

    CONSTRAINT "Tamblate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contant" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Star" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userprojectId" TEXT,
    "blogId" TEXT,
    "challengeId" TEXT,

    CONSTRAINT "Star_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userprojectId" TEXT,
    "blogId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberClass" (
    "id" TEXT NOT NULL,
    "classRomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isTeacher" BOOLEAN NOT NULL,

    CONSTRAINT "MemberClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackProjct" (
    "id" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "classProjectId" TEXT NOT NULL,
    "memberClassId" TEXT NOT NULL,

    CONSTRAINT "FeedbackProjct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Verified_email_key" ON "Verified"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Verified_userId_key" ON "Verified"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_userId_key" ON "Feedback"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EditorConfig_userId_key" ON "EditorConfig"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSubscription_userId_key" ON "PlanSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagename_key" ON "Tag"("tagename");

-- AddForeignKey
ALTER TABLE "Verified" ADD CONSTRAINT "Verified_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditorConfig" ADD CONSTRAINT "EditorConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeaturePlan" ADD CONSTRAINT "FeaturePlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_romId_fkey" FOREIGN KEY ("romId") REFERENCES "Rom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassProject" ADD CONSTRAINT "ClassProject_memberClassId_fkey" FOREIGN KEY ("memberClassId") REFERENCES "MemberClass"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSubscription" ADD CONSTRAINT "PlanSubscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rom" ADD CONSTRAINT "Rom_classRomId_fkey" FOREIGN KEY ("classRomId") REFERENCES "ClassRom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagMorph" ADD CONSTRAINT "TagMorph_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "Star" ADD CONSTRAINT "Star_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
