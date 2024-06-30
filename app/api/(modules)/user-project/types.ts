export interface UserProjectInput {
    name?: string;
    description?: string;
    tagId: string[];
    templateId: string;
}
export interface CloneCodeFromUserProjectInput {
    name?: string;
    description?: string;
    tagId: string[];
    labId: string
}
export interface EditMyUserProjectLabInput {
    userProjectid: string;
    name?: string;
    description?: string;
    tagId: string[];
}

export interface GetUserProjectInput {
    page: number;
    pageSize: number;
    nameLab?: string;
    tagId?: string;
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
    searchWord?: string;
}
export interface MyUserProjectInput {
    page: number;
    pageSize: number;
    searchWord?: string;
}
