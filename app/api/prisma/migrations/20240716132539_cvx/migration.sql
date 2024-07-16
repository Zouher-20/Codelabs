-- AlterTable
ALTER TABLE "UserProject" ADD COLUMN     "reportBlogId" TEXT,
ADD COLUMN     "reportClassId" TEXT;

-- CreateTable
CREATE TABLE "ReportUserProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "userprojectId" TEXT NOT NULL,

    CONSTRAINT "ReportUserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportBlog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,

    CONSTRAINT "ReportBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportClass" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "classRoomId" TEXT NOT NULL,

    CONSTRAINT "ReportClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCommentBlog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "ReportCommentBlog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportCommentUserProject" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "commentUserProjectId" TEXT NOT NULL,

    CONSTRAINT "ReportCommentUserProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "messageReport" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportUserProject_reportId_key" ON "ReportUserProject"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportUserProject_userprojectId_key" ON "ReportUserProject"("userprojectId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportBlog_reportId_key" ON "ReportBlog"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportBlog_blogId_key" ON "ReportBlog"("blogId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportClass_reportId_key" ON "ReportClass"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportClass_classRoomId_key" ON "ReportClass"("classRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCommentBlog_reportId_key" ON "ReportCommentBlog"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCommentBlog_commentId_key" ON "ReportCommentBlog"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCommentUserProject_reportId_key" ON "ReportCommentUserProject"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportCommentUserProject_commentUserProjectId_key" ON "ReportCommentUserProject"("commentUserProjectId");

-- AddForeignKey
ALTER TABLE "ReportUserProject" ADD CONSTRAINT "ReportUserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportUserProject" ADD CONSTRAINT "ReportUserProject_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportUserProject" ADD CONSTRAINT "ReportUserProject_userprojectId_fkey" FOREIGN KEY ("userprojectId") REFERENCES "UserProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportBlog" ADD CONSTRAINT "ReportBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportBlog" ADD CONSTRAINT "ReportBlog_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportBlog" ADD CONSTRAINT "ReportBlog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportClass" ADD CONSTRAINT "ReportClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportClass" ADD CONSTRAINT "ReportClass_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportClass" ADD CONSTRAINT "ReportClass_classRoomId_fkey" FOREIGN KEY ("classRoomId") REFERENCES "ClassRom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentBlog" ADD CONSTRAINT "ReportCommentBlog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentBlog" ADD CONSTRAINT "ReportCommentBlog_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentBlog" ADD CONSTRAINT "ReportCommentBlog_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentUserProject" ADD CONSTRAINT "ReportCommentUserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentUserProject" ADD CONSTRAINT "ReportCommentUserProject_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportCommentUserProject" ADD CONSTRAINT "ReportCommentUserProject_commentUserProjectId_fkey" FOREIGN KEY ("commentUserProjectId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
