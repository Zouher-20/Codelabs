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
    planName?: string;
}
export interface deleteAnyBlogInput {
    blogId: string;
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

export interface editPlanInput {
    planId: string;
    subtitle: string;
    duration: string;
    price: number;
    featurePlans: { name: NAMEPLAN; value: number }[];
    name: string;
}

export interface deleteChallengeInput {
    challengeId: string[];
}

export interface challengeDetailsInput {
    page: number;
    pageSize: number;
    challengeId: string;
}

export interface ProjectInput {
    page: number;
    pageSize: number;
    nameLab?: string;
    tagName?: string;
}
export interface deleteMyCommentUserProjectLabInput {
    commentId: string;
}

export interface DeleteUserProjectInput {
    userProjectId: string;
}

export interface getLabsInChallengeInput {
    challengeId: string;
    pageSize: number;
    page: number;
}
export interface uploadTemplateImageInput {
    file: File;

}
export interface addTemplateInput {
    nameTemplate: string;
    imageTemplate: string
}