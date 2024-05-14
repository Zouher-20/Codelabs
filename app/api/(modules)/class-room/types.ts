export interface AddClassRoomInput {
    name?: string;
    description?: string;
    type?: string;
}

export interface getClassesByMeInput {
    page: number;
    pageSize: number;
    searchWord?: string;
}
export interface getMyClassesInput {
    page: number;
    pageSize: number;
    searchWord?: string;
}
