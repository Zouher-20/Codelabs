import { NAMEPLAN } from '@prisma/client';

export interface userType {
    id: string;
    email: string;
    name?: string | null;
    username: string;
    password: string;
    bio: string;
    role: string;
    createdAt: Date | null;
    position: string;
    typeUser: string | null;
    userImage: string;
    planEndDate: Date | null;
    inActive: boolean;
    PlanSubscription: {
        id: string;
        userId: string;
        planId: string;
        plan: {
            id: string;
            name: string;
            price: number | null;
            duration: string | null;
            subtitle: string;
            createdAt: Date | null;
            FeaturePlan: Array<{ name: NAMEPLAN; value: number }>;
        };
    } | null;
}

export interface ClassRoomUserType {
    name: string;
    id: string;
    email: string;
    image?: string | null;
    isTeacher: boolean;
    selected?: UserState;
    withCheck?: boolean;
}

export enum UserState {
    selected,
    notSelected,
    alreadySelected
}
