"use server";
import { getAllClassRoomsInput, GetClassRomByIdInput, GetClassRomStatistics, GetRomInClassInput, GetRoomAndTeacherDetailsInput, GetUserInClassInput } from "../../../class-room/types";
import AdminClassRoomRepository from "../repository/admin-class-rom-repository";

export const getRoomAndTeacherDetailsForAdmin = async (payload: GetRoomAndTeacherDetailsInput) => {
    return AdminClassRoomRepository.getRoomAndTeacherDetailsForAdmin(payload);
};

export const getClassRomStatisticsForAdmin = async (payload: GetClassRomStatistics) => {
    return AdminClassRoomRepository.getClassRomStatisticsForAdmin(payload);
};
export const getClassRomById = async (payload: GetClassRomByIdInput) => {

    return AdminClassRoomRepository.getClassRomByIdForAdmin(payload);
};

export const getAllClassRooms = async (payload: getAllClassRoomsInput) => {
    return AdminClassRoomRepository.getAllClassRooms(payload);
};

export const getUserInClassForAdmin = async (payload: GetUserInClassInput) => {
    return AdminClassRoomRepository.getUserInClassForAdmin(payload);
};

export const getRomInClass = async (payload: GetRomInClassInput) => {

    return AdminClassRoomRepository.getRomInClassForAdmin(payload);
};
