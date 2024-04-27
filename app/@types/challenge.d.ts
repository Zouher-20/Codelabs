export interface challengeType {
    id: number;
    name: string;
    duration: string;
    difficulty: string;
    isComplete: boolean;
    createdAt: string;
    description: string;
    resources: string;
    tags: [{ name: string; tagType: string }];
}
