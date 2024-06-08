'use server';

'use server';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import classRoomRepository from '@/app/api/(modules)/class-room/repository/class-room-repository';
import {
    AddClassRoomInput,
    AddRomInClassInput,
    AddUsersInClassInput,
    GetAllUserAndSearchInput,
    GetClasRomAndTeacherDetailsInput,
    getClassesByMeInput,
    GetClassRomByIdInput,
    GetClassRomForStudentsByIdInput,
    GetClassRomStatistics,
    GetLabsSubmittedInRomInput,
    getMyClassesInput,
    GetRomByIdInput,
    GetRomInClassInput,
    GetStudentsStatisticsSubmittedInput,
    GetUserInClassInput
} from '@/app/api/(modules)/class-room/types';

export const addClassRoom = async (payload: AddClassRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addClassRoom(payload, userId);
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
export const getClassRoomAndTeacherDetails = async (payload: GetClasRomAndTeacherDetailsInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.getClassRoomAndTeacherDetails(payload, userId);
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

export const addRomInClass = async (payload: AddRomInClassInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addRomInClass(payload, userId);
};

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
