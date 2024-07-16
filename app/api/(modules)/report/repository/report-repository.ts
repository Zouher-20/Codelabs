import { ReportType } from "../../../core/constant/enum.ts";
import { db } from "../../../core/db/db.ts"
class ReportRepository {
    static async addReport(payload: {
        reportType: any;
        userProjectId?: string;
        blogId?: string;
        commentUserProjectId?: string;
        commentBlogId: string;
        classId?: string;
        messageReport: string
    }, userId: string) {
        if (payload.reportType === ReportType.USER_PROJECT) {

            if (payload.userProjectId == null || payload.userProjectId === "") {
                throw new Error("userProjectId is required");
            }
            const lab = await db.userProject.findUnique({
                where: {
                    id: payload.userProjectId
                }
            });
            if (!lab) {
                throw new Error("lab not found");
            }
            const hasreport = await db.reportUserProject.findUnique({
                where: {
                    userId: userId,
                    userprojectId: payload.userProjectId
                }
            });
            if (hasreport) {
                throw new Error(" you have alrady report in this lab");
            }
            const newReport = await db.report.create({
                data: {
                    messageReport: payload.messageReport
                }
            });
            await db.reportUserProject.create({
                data: {
                    userprojectId: payload.userProjectId,
                    reportId: newReport.id,
                    userId: userId
                }
            });
            return "thanks for reporting.";
        }
        else if (payload.reportType === ReportType.COMMENT_USER_PROJECT) {

            if (payload.commentUserProjectId == null || payload.commentUserProjectId === "") {
                throw new Error("commentUserProjectId is required ");
            }

            const comment = await db.comment.findUnique({
                where: {
                    id: payload.commentUserProjectId,
                }
            });
            if (!comment) {
                throw new Error("comment not found !.");
            }

            const hasreport = await db.reportCommentUserProject.findUnique({
                where: {
                    userId: userId,
                    commentUserProjectId: payload.commentUserProjectId
                }
            });
            if (hasreport) {
                throw new Error(" you have alrady report for this comment");
            }
            const newReport = await db.report.create({
                data: {
                    messageReport: payload.messageReport
                }
            });
            await db.reportCommentUserProject.create({
                data: {
                    reportId: newReport.id,
                    userId: userId,
                    commentUserProjectId: comment.id
                }
            });
            return "thanks for reporting.";


        }
        else if (payload.reportType === ReportType.BLOG) {

            if (payload.blogId == null || payload.blogId === "") {
                throw new Error("blogId is required");
            }
            const blog = await db.blog.findUnique({
                where: {
                    id: payload.blogId
                }
            });
            if (!blog) {
                throw new Error("blog not found");
            }
            const hasreport = await db.reportBlog.findUnique({
                where: {
                    userId: userId,
                    blogId: payload.blogId
                }
            });
            if (hasreport) {
                throw new Error(" you have alrady report in this blog");
            }
            const newReport = await db.report.create({
                data: {
                    messageReport: payload.messageReport
                }
            });
            await db.reportBlog.create({
                data: {
                    blogId: blog.id,
                    reportId: newReport.id,
                    userId: userId
                }
            });
            return "thanks for reporting.";
        }
        else if (payload.reportType === ReportType.COMMENT_BLOG) {

            if (payload.commentBlogId == null || payload.commentBlogId === "") {
                throw new Error(" blogId is required ");
            }

            const comment = await db.comment.findUnique({
                where: {
                    id: payload.commentUserProjectId,
                }
            });

            if (!comment) {
                throw new Error("comment not found !.");
            }
            const hasreport = await db.reportCommentBlog.findUnique({
                where: {
                    userId: userId,
                    commentId: payload.commentBlogId
                }
            });
            if (hasreport) {
                throw new Error(" you have alrady report for this comment");
            }
            const newReport = await db.report.create({
                data: {
                    messageReport: payload.messageReport
                }
            });
            await db.reportCommentBlog.create({
                data: {
                    reportId: newReport.id,
                    userId: userId,
                    commentId: comment.id
                }
            });
            return "thanks for reporting.";
        }
        else if (payload.reportType === ReportType.CLASS) {

            if (payload.classId == null || payload.classId === "") {
                throw new Error("class Id is required");
            }
            const classRoom = await db.classRom.findUnique({
                where: {
                    id: payload.classId
                }
            });
            if (!classRoom) {
                throw new Error("classRoom not found");
            }
            const checkinclass = await db.classRom.findUnique({
                where: {
                    id: payload.classId,
                    MemberClass: {
                        some: {
                            userId: userId
                        }
                    }
                }
            });
            if (!checkinclass) {
                throw new Error(" you are not member in this class");
            }
            const hasreport = await db.reportClass.findUnique({
                where: {
                    userId: userId,
                    classRoomId: payload.classId
                }
            });
            if (hasreport) {
                throw new Error(" you have alrady report in this lab");
            }
            const newReport = await db.report.create({
                data: {
                    messageReport: payload.messageReport
                }
            });
            await db.reportClass.create({
                data: {
                    classRoomId: classRoom.id,
                    reportId: newReport.id,
                    userId: userId
                }
            });
            return "thanks for reporting.";

        }
        else {
            throw new Error("please chose type for report..");
        }


    }


}

export default ReportRepository;