import { DIFFICULTTYPE, NAMEPLAN } from '@prisma/client';

export interface TagPaginationInput {
    page: number;
    pageSize: number;
    tagName?: string;
}

export interface UsersPaginationInput {
    page: number;
    pageSize: number;
    searchWord?: string;
    date?: Date;
}
export interface ChallengePaginationInput {
    page: number;
    pageSize: number;
    name?: string;
    challengeType?: DIFFICULTTYPE;
}

export interface deleteUserInput {
    userId: string;
}

export interface ChallengeInput {
    name: string;
    difficulty: DIFFICULTTYPE;
    endAt: Date;
    startedAt: Date;
    description: string;
    resources: string;
    tagId: string[];
}

export interface PlanInput {
    subtitle: string;
    duration: string;
    price: number;
    featurePlans: { name: NAMEPLAN; value: number }[];
    name: string;
}

export interface PlanPaginationInput {
    planId: string;
}
