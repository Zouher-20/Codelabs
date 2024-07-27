export interface AddReportInput {
    reportType: any;
    userProjectId?: string;
    blogId?: string;
    commentUserProjectId?: string;
    commentBlogId?: string;
    classId?: string;
    messageReport: string;
}

export interface GetReportedInput {
    page: number;
    pageSize: number;
    reportType: any;
}

export interface DeleteAnyReportInput {
    reportId: string;
}
