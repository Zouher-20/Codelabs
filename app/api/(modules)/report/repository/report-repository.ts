import { ReportType } from "@/app/api/core/constant/enum";
import { db } from "@/app/api/core/db/db.js";
class ReportRepository {
    static async addReport(payload: {
        reportType: any;
        userProjectId?: string;
        blogId?: string;
        commentUserProjectId?: string;
        commentBlogId?: string;
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
    static async deleteAnyReport(payload: {
        reportId: string
    }) {

        const report = await db.report.findUnique({
            where: {
                id: payload.reportId
            }
        });
        if (!report) {
            throw new Error('this report not found');
        }

        await db.report.delete({
            where: {
                id: report.id
            }
        });
        return "report deleted successflly";
    }

    static async deleteMyReport(payload: { reportId: string }, userId: string) {

        const findMyReport = await db.report.findUnique({
            where: {
                id: payload.reportId,
                OR: [
                    {
                        ReportUserProject: {
                            userId: userId
                        }
                    },
                    {
                        ReportBlog: {
                            userId: userId
                        }
                    },
                    {
                        ReportClass: {
                            userId: userId
                        }
                    },
                    {
                        ReportCommentBlog: {
                            userId: userId
                        }
                    },
                    {
                        ReportCommentUserProject: {
                            userId: userId
                        }
                    }

                ]
            }
        });

        if (!findMyReport) {
            throw new Error('this report was deleted please refrash again...');
        }

        await db.report.delete({
            where: {
                id: findMyReport.id
            }
        });
        return "report deleted successfully"
    }

    static async editMyReport(payload: {
        reportId: string
        reportMessage: string
    }, userId: string) {


        const findMyReport = await db.report.findUnique({
            where: {
                id: payload.reportId,
                OR: [
                    {
                        ReportUserProject: {
                            userId: userId
                        }
                    },
                    {
                        ReportBlog: {
                            userId: userId
                        }
                    },
                    {
                        ReportClass: {
                            userId: userId
                        }
                    },
                    {
                        ReportCommentBlog: {
                            userId: userId
                        }
                    },
                    {
                        ReportCommentUserProject: {
                            userId: userId
                        }
                    }

                ]
            }
        });

        if (!findMyReport) {
            throw new Error('this report was deleted please refrash again...');
        }

        await db.report.update({
            where: {
                id: findMyReport.id
            },
            data: {
                messageReport: payload.reportMessage
            }
        });
        return "report was updated successfully";
    }
    static async getReport(
        payload: {
            page: number;
            pageSize: number;
            reportType: any;
        }
    ) {

        const skip = (payload.page - 1) * payload.pageSize;


        if (payload.reportType === ReportType.USER_PROJECT) {

            const labReported = await db.report.findMany({
                skip: skip,
                take: payload.pageSize,
                include: {
                    ReportUserProject: {
                        include: {
                            user: true,
                            userProject: {
                                include: {
                                    user: true
                                }
                            }

                        }

                    }

                }

            });
            const totalLabReported = await db.report.count({
                where: {
                    ReportUserProject: {}
                }

            });
            return {
                labReported,
                totalLabReported
            }
        }
        else if (payload.reportType === ReportType.COMMENT_USER_PROJECT) {

            const commentLabReported = await db.report.findMany({
                skip: skip,
                take: payload.pageSize,
                include: {
                    ReportCommentUserProject: {
                        include: {
                            user: true,
                            comment: {
                                include: {
                                    userproject: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }

                        }

                    }

                }

            });
            const totalCommentLabReported = await db.report.count({
                where: {
                    ReportCommentUserProject: {}
                }

            });
            return {
                commentLabReported,
                totalCommentLabReported
            }

        }
        else if (payload.reportType === ReportType.COMMENT_BLOG) {

            const commentBlogReported = await db.report.findMany({
                skip: skip,
                take: payload.pageSize,
                include: {
                    ReportCommentBlog: {
                        include: {
                            user: true,
                            comment: {
                                include: {
                                    blog: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }

                        }

                    }

                }

            });
            const totalCommentBlogReported = await db.report.count({
                where: {
                    ReportCommentBlog: {}
                }

            });
            return {
                commentBlogReported,
                totalCommentBlogReported
            }
        }
        else if (payload.reportType === ReportType.BLOG) {

            const blogReported = await db.report.findMany({
                skip: skip,
                take: payload.pageSize,
                include: {
                    ReportBlog: {
                        include: {
                            user: true,
                            blog: {
                                include: {
                                    user: true
                                }
                            }
                        }

                    }

                }

            });
            const totalBlogReported = await db.report.count({
                where: {
                    ReportBlog: {}
                }

            });
            return {
                blogReported,
                totalBlogReported
            }
        }
        else if (payload.reportType === ReportType.CLASS) {


            const classReported = await db.report.findMany({
                skip: skip,
                take: payload.pageSize,
                include: {
                    ReportClass: {
                        include: {
                            user: true,
                            classRom: {
                                include: {
                                    MemberClass: {
                                        include: {
                                            user: true
                                        }
                                    }
                                }
                            }
                        }

                    }

                }

            });
            const totalClassgReported = await db.report.count({
                where: {
                    ReportClass: {}
                }

            });
            return {
                classReported,
                totalClassgReported
            }


        } else {
            throw new Error("please chose type for geting result..");
        }
    }

    static async sendSpamEmailForReport() { }



}

export default ReportRepository;