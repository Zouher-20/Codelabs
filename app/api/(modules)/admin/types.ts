import { DIFFICULTTYPE } from '@prisma/client';

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
    tagName?: string;
    challengeType?: DIFFICULTTYPE;
}
