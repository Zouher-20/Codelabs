import { DateTime } from 'next-auth/providers/kakao';

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
export interface AddRomInClassInput {
    classRomId: string;
    description?: string;
    name?: string;
    endAt: DateTime;
    type?: string;
}

export interface AddUsersInClassInput {
    classRomId: string;
    userIds: string[];
}
export interface GetClassRomForStudentsByIdInput {
    classRomId: string;
}

export interface GetAllUserAndSearchInput {
    page: number;
    pageSize: number;
    searchWord: string;
}
export interface GetClassRomStatistics {
    classRomId: string;
}
export interface GetStudentsStatisticsSubmittedInput {
    page: number;
    pageSize: number;
    romId: string;
}
