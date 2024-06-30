'use server';

'use server';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import classRoomRepository from '@/app/api/(modules)/class-room/repository/class-room-repository';
import {
    AddClassRoomInput,
    AddFeedbackInForClassProjectInRomInput,
    AddRomInClassInput,
    AddUsersInClassInput,
    CloneLabForRoomInClassInput,
    cloneLabFromTeacherInRoomInput,
    createRoomFromTemplateInput,
    DeleteMYClassInput,
    DeleteMyFeedbackInput,
    DeleteUserFromMyClassInput,
    ExitUserFromYourClassInput,
    getAllClassRoomsInput,
    GetAllUserAndSearchInput,
    getClassesByMeInput,
    GetClassRomByIdInput,
    GetClassRomForStudentsByIdInput,
    GetClassRomStatistics,
    GetLabsSubmittedInRomInput,
    getMyClassesInput,
    GetMyLabInRoomInput,
    GetRomByIdInput,
    GetRomInClassInput,
    GetRoomAndTeacherDetailsInput,
    GetStudentsStatisticsSubmittedInput,
    GetUserInClassInput,
    SubmittedLabsInRoomInput
} from '@/app/api/(modules)/class-room/types';
import ActoinRoomRepository from '../repository/action-room-repository';

export const addClassRoom = async (payload: AddClassRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addClassRoom(payload, userId);
};

export const getMyLabInRoom = async (payload: GetMyLabInRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getMyLabInRoom(payload, userId);
};

export const cloneLabForRoomInClass = async (payload: CloneLabForRoomInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return ActoinRoomRepository.cloneLabForRoomInClass(payload, userId);
};
export const cloneLabFromTeacherInRoom = async (payload: cloneLabFromTeacherInRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return ActoinRoomRepository.cloneLabFromTeacherInRoom(payload, userId);
};

export const createRoomFromTemplate = async (payload: createRoomFromTemplateInput) => {
    const session = await getSession();
    const userId = session?.id;
    return ActoinRoomRepository.createRoomFromTemplate(payload, userId);
};

export const deleteMyFeedback = async (payload: DeleteMyFeedbackInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.deleteMyFeedback(payload, userId);
}

export const exitUserFromYourClass = async (payload: ExitUserFromYourClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.exitUserFromYourClass(payload, userId);
};


export const getClassCreateByMe = async (payload: getClassesByMeInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getClassCreateByMe(payload, userId);
};

export const getMyClass = async (payload: getMyClassesInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getMyClass(payload, userId);
};

export const getClassRomById = async (payload: GetClassRomByIdInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getClassRomById(payload, userId);
};
// for member class
export const getRoomAndTeacherDetails = async (payload: GetRoomAndTeacherDetailsInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getRoomAndTeacherDetails(payload, userId);
};
export const submittedLabsInRoom = async (payload: SubmittedLabsInRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.submitLabsInRoom(payload, userId);
};
export const addFeedbackInForClassProjectInRom = async (
    payload: AddFeedbackInForClassProjectInRomInput
) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addFeedbackInForClassProjectInRom(payload, userId);
};

export const getUserInClass = async (payload: GetUserInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getUserInClass(payload, userId);
};

export const getRomInClass = async (payload: GetRomInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getRomInClass(payload, userId);
};

export const getAllClassRooms = async (payload: getAllClassRoomsInput) => {
    return classRoomRepository.getAllClassRooms(payload);
}
export const addRomInClass = async (payload: AddRomInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addRomInClass(payload, userId);
};
export const deleteMyClass = async (payload: DeleteMYClassInput) => {
    const session = await getSession();
    const userId = session?.id
    return classRoomRepository.deleteMyClass(payload, userId);
}

export const deleteUserFromMyClass = async (payload: DeleteUserFromMyClassInput) => {
    const session = await getSession();
    const userId = session?.id
    return classRoomRepository.deleteUserFromMyClass(payload, userId);
}

export const addUsersInClass = async (payload: AddUsersInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addUsersInClass(payload, userId);
};
export const getClassRomForStudentsById = async (payload: GetClassRomForStudentsByIdInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getClassRomForStudentsById(payload, userId);
};

//For add user In rom
export const getAllUserAndSearch = async (payload: GetAllUserAndSearchInput) => {
    return classRoomRepository.getAllUserAndSearch(payload);
};

export const getClassRomStatistics = async (payload: GetClassRomStatistics) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getClassRomStatistics(payload, userId);
};

export const getStudentsStatisticsSubmitted = async (
    payload: GetStudentsStatisticsSubmittedInput
) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getStudentsStatisticsSubmitted(payload, userId);
};

export const getRomById = async (payload: GetRomByIdInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getRomById(payload, userId);
};
export const getLabsSubmittedInRom = async (payload: GetLabsSubmittedInRomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getLabsSubmittedInRom(payload, userId);
};
