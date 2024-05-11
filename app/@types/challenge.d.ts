import { DIFFICULTTYPE } from '@prisma/client';

export interface challengeType {
    name: string;
    difficulty: DIFFICULTTYPE;
    endAt: Date;
    startedAt: Date;
    description: string;
    resources: string;
    tagId: string[];
    isComplete?: boolean;
    createdAt?: Date;
}
