import { getSession } from '@/app/api/(modules)/auth/service/actions';
import classRoomRepository from '@/app/api/(modules)/class-room/repository/class-room-repository';
import { AddClassRoomInput } from '@/app/api/(modules)/class-room/types';

export const addClassRoom = async (payload: AddClassRoomInput) => {
    const session = await getSession();
    const userId = session?.id;
    return classRoomRepository.addClassRoom(payload, userId);
};
