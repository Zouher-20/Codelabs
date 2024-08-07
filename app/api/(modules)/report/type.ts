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
    searchWord?: string
}

export interface DeleteAnyReportInput {
    reportId: string;
}

export interface getReportByIdInput {
    reportId: string;
}
