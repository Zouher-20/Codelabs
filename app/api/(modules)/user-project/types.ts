export interface UserProjectInput {
    name?: string;
    description?: string;
    tagId: string[];
    jsonFile: string;
    templateId?: string | null;
}

export interface GetUserProjectInput {
    page: number;
    pageSize: number;
    nameLab?: string;
    tagName?: string;
}

export interface AddCommentUserProjectLabInput {
    userProjectId: string;
    comment: string;
}
export interface GetCommentUserProjectLabInput {
    page: number;
    pageSize: number;
    userProjectId: string;
}
export interface GetDetailsUserProjectLabInput {
    userProjectId: string;
}

export interface AddAndDeleteStarUserProjectInput {
    userProjectId: string;
    action: boolean;
}
export interface DeleteMyUserProjectInput {
    userProjectId: string;
}

export interface userProjectStaredInput {
    page: number;
    pageSize: number;
}
