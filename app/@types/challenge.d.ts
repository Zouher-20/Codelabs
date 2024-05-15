import { DIFFICULTTYPE } from '@prisma/client';

export interface challengeType {
    id?: string;
    name: string;
    difficulty: DIFFICULTTYPE;
    endAt: Date;
    startedAt: Date;
    description: string;
    resources: string;
    tagId: string[];
    isComplete?: boolean;
    createdAt?: Date;
    ChallengeParticipation?: [];
    tagMorph: [];
}
