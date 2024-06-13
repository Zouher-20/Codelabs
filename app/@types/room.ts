import { userType } from './user';

export interface RoomType {
    title: string;
    id: string;
    type: string;
    description: string;
    endAt: Date;
    createdAt: Date;
    teatcher?: userType;
}
