export interface UserProjectInput {
    name?: string;
    description?: string;
    tagId: string[];
    jsonFile: string;
    templateId?: string | null;
}
