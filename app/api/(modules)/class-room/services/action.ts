'use server';

import { getSession } from '@/app/api/(modules)/auth/service/actions';
import classRoomRepository from '@/app/api/(modules)/class-room/repository/class-room-repository';
import {
    AddClassRoomInput,
    AddRomInClassInput,
    AddUsersInClassInput,
    getClassesByMeInput,
    GetClassRomByIdInput,
    GetClassRomForStudentsByIdInput,
    getMyClassesInput,
    GetRomInClassInput,
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
