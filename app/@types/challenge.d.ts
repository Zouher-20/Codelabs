export interface challengeType {
    id: string;
    name: string;
    isComplete: boolean;
    difficulty: DIFFICULTTYPE;
    endAt: Date | null;
    startedAt: Date | null;
    createdAt: Date;
    description: string | null;
    resources: string | null;
    tags: string[];
}
