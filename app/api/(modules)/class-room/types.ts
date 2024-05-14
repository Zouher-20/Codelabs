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

export interface GetClassRomByIdInput {
    classRomId: string;
}
export interface GetRomInClassInput {
    romePage: number;
    romPageSize: number;
    classRomId: string;
}
export interface GetUserInClassInput {
    classRomId: string;
    userPage: number;
    userPageSize: number;
}
