import { NAMEPLAN } from '@prisma/client';

export interface userType {
    id: string;
    email: string;
    name?: string | null;
    username: string;
    image?: string | null;
    user?: string;
    password?: string;
    bio?: string | null;
    role?: string;
    createdAt?: Date | null;
    position?: string | null;
    typeUser?: string | null;
    userImage?: string | null;
    planEndDate?: Date | null;
    inActive?: boolean;
    PlanSubscription?: {
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
            FeaturePlan: { name: NAMEPLAN; value: number };
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
