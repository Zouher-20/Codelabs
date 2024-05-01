import { db } from '@/app/api/core/db/db';
import { DIFFICULTTYPE, TAGTYPE } from '@prisma/client';

class AdminRepository {
    static async findManyUser(payload: {
        page: number;
        pageSize: number;
        searchWord?: string;
        planName?: string;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        let args = {};
        if (payload.searchWord && payload.planName) {
            args = {
                AND: [
                    {
                        OR: [
                            { email: { contains: payload.searchWord } },
                            { username: { contains: payload.searchWord } }
                        ]
                    },
                    {
                        PlanSubscription: {
                            some: {
                                plan: {
                                    name: payload.planName
                                }
                            }
                        }
                    }
                ]
            };
        } else if (payload.searchWord) {
            args = {
                OR: [
                    { email: { contains: payload.searchWord } },
                    { username: { contains: payload.searchWord } }
                ]
            };
        } else if (payload.planName) {
            args = {
                PlanSubscription: {
                    some: {
                        plan: {
                            name: payload.planName
                        }
                    }
                }
            };
        }
        const users = await db.user.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                ...args
            },
            include: {
                PlanSubscription: {
                    include: {
                        plan: true
                    }
                }
            }
        });

        const userCount = await db.user.count({
            where: {
                ...args
            }
        });

        return {
            user: { users },
            userCount: userCount
        };
    }

    static async getPlanName() {
        const plansName = await db.plan.findMany();
        return plansName;
    }
    static async findManyTag(payload: { page: number; pageSize: number; tagName?: string }) {
        const skip = (payload.page - 1) * payload.pageSize;
        const tags = await db.tag.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                tagename: { contains: payload.tagName }
            }
        });
        return {
            tags
        };
    }

    static async addTag(tag: string, tagType: TAGTYPE | null) {
        const existingTag = await db.tag.findUnique({
            where: {
                tagename: tag
            }
        });

        if (existingTag) {
            throw new Error('Tag already exists.');
        }

        const newTag = await db.tag.create({
            data: {
                tagename: tag,
                tagtype: tagType ?? TAGTYPE.normal
            }
        });

        return newTag;
    }

    static async findManyChallenge(payload: {
        page: number;
        pageSize: number;
        name?: string;
        challengeType?: DIFFICULTTYPE;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        let args = {};
        if (payload.name && payload.challengeType) {
            args = {
                AND: [
                    {
                        name: { contains: payload.name }
                    },
                    { difficulty: payload.challengeType }
                ]
            };
        } else if (payload.challengeType) {
            args = {
                difficulty: payload.challengeType
            };
        } else if (payload.name) {
            args = { name: { contains: payload.name } };
        }

        const challenges = await db.challenge.findMany({
            take: payload.pageSize,
            skip: skip,
            where: {
                ...args
            },
            include: {
                ChallengeParticipation: true,
                TagMorph: {
                    include: {
                        tag: true
                    }
                }
            }
        });

        const challengeCount = await db.challenge.count({
            where: {
                ...args
            }
        });

        return {
            challenges,
            challengeCount
        };
    }
    static async getDifficultChallenge() {
        const typeChallenge = Object.values(DIFFICULTTYPE);
        return typeChallenge;
    }

    static async deleteUser(payload: { userId: string }) {
        const requestingUser = await db.user.findUnique({
            where: {
                id: payload.userId
            }
        });
        if (!requestingUser) {
            throw new Error('User not found');
        }
        await db.user.deleteMany({
            where: {
                id: payload.userId
            }
        });
    }

    static async addChallenge(payload: {
        name: string;
        difficulty: DIFFICULTTYPE;
        endAt: Date;
        startedAt: Date;
        description: string;
        resources: string;
        tagId: string[];
    }) {
        const newChallenge = await db.challenge.create({
            data: {
                name: payload.name,
                description: payload.description,
                resources: payload.resources,
                endAt: payload.endAt,
                startedAt: payload.startedAt,
                difficulty: payload.difficulty,
                isComplete: false
            }
        });

        // 2. Retrieve tags based on the provided tagNames
        const tags = await db.tag.findMany({
            where: {
                id: {
                    in: payload.tagId
                }
            }
        });

        if (tags.length !== payload.tagId.length) {
            throw new Error(`One or more tags not found.`);
        }

        const tagMorphCreatePromises = tags.map(tag =>
            db.tagMorph.create({
                data: {
                    tagId: tag.id,
                    challengeId: newChallenge.id
                }
            })
        );

        await Promise.all(tagMorphCreatePromises);

        return newChallenge;
    }
}

export default AdminRepository;
