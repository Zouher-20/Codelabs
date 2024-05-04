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
