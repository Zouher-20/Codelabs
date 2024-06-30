import { DateTime } from 'next-auth/providers/kakao';

export interface AddClassRoomInput {
    name?: string;
    description?: string;
    type?: string;
}

export interface GetMyLabInRoomInput {
    roomId: string
}

export interface CloneLabForRoomInClassInput {
    classRomId: string;
    description?: string;
    name?: string;
    endAt: DateTime;
    type?: string;
    labId: string;
}
export interface cloneLabFromTeacherInRoomInput {
    roomId: string
}
export interface ExitUserFromYourClassInput {
    classRoomId: string;
}

export interface DeleteMyFeedbackInput {
    feedbackId: string
}
export interface createRoomFromTemplateInput {
    classRomId: string;
    description?: string;
    name?: string;
    endAt: DateTime;
    type?: string;
    templateId: string

}
export interface GetAllFeedbackInRoomInput {
    classProjectId: string;
    pageSize: number;
    page: number
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
export interface GetRomByIdInput {
    romId: string;
}
export interface GetLabsSubmittedInRomInput {
    romId: string;
    pageSize: number;
    page: number;
}

export interface GetRoomAndTeacherDetailsInput {
    romId: string;
}
export interface SubmittedLabsInRoomInput {
    romId: string;
    jsonFile: string;
}
export interface AddFeedbackInClassProjectIput {
    feedback: string;
    classProjectId: string;

}

export interface getAllClassRoomsInput {
    page: number;
    pageSize: number;
    searchWord?: string
}

export interface DeleteUserFromMyClassInput {
    classRoomId: string;
    userIds: string[];
}
export interface DeleteMYClassInput {

    classRoomId: string;
}
