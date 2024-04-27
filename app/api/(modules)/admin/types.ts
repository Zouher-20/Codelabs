export interface TagPaginationInput {
    page: number;
    pageSize: number;
    tagName?: string;
}

export interface UsersPaginationInput {
    page: number;
    pageSize: number;
    searchWord?: string;
    date?: Date;
    args: any;
}
