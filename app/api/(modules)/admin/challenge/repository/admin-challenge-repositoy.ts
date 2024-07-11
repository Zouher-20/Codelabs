import { db } from '@/app/api/core/db/db';
import { createSlug } from '@/app/utils/slug-createor';
import { DIFFICULTTYPE } from '@prisma/client';

class AdminChallengeRepository {
    static async addChallenge(payload: {
        name: string;
        difficulty: DIFFICULTTYPE;
        endAt: Date;
        startedAt: Date;
        description: string;
        resources: string;
    }) {
        const newChallenge = await db.challenge.create({
            data: {
                name: payload.name,
                description: payload.description,
                resources: payload.resources,
                endAt: payload.endAt,
                startedAt: payload.startedAt,
                difficulty: payload.difficulty,
                isComplete: false,
            }
        });
        let tag = "ch-" + createSlug(newChallenge.name);
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
                isChanllange: true
            }
        });
        await db.tagMorph.create({
            data: {
                challengeId: newChallenge.id,
                tagId: newTag.id
            }
        });


        return newChallenge;
    }
    static async getAllUserProjectsInChallengeDetails(payload: {
        challengeId: string;
        pageSize: number;
        page: number;
    }) {
        const skip = (payload.page - 1) * payload.pageSize;

        const challenge = await db.challenge.findUnique({
            where: {
                id: payload.challengeId
            }
        });

        if (!challenge) {
            throw new Error('Challenge not found');
        }
        const userProjectsLabs = await db.userProject.findMany({
            skip: skip,
            take: payload.pageSize,
            where: {
                TagMorph: {
                    some: {
                        challengeId: challenge.id,
                        tag: {
                            isChanllange: true
                        }
                    }
                }
            },
            include: {
                lab: true
            }
        });

        if (!userProjectsLabs || userProjectsLabs.length === 0) {
            throw new Error('There are no labs for this challenge');
        }

        const totalCount = await db.userProject.count({
            where: {
                TagMorph: {
                    some: {
                        challengeId: challenge.id,
                        tag: {
                            isChanllange: true
                        }
                    }
                }
            },
        });

        return {
            userProjectsLabs: userProjectsLabs,
            totalCount: totalCount
        };
    }
    static async getDetailsChallenge(
        payload: {
            challengeId: string;
        },
    ) {
        const challenge = await db.challenge.findUnique({
            where: {
                id: payload.challengeId
            },
        });
        if (!challenge) {
            throw new Error('challange not found')
        }
        return { challenge };
    }
    static async deleteChallenge(payload: { challengeId: string[] }) {
        const hasChallenge = await db.challenge.findMany({
            where: {
                id: {
                    in: payload.challengeId
                }
            }
        });

        if (hasChallenge.length === 0) {
            throw new Error('Challenge is not found.');
        }

        await db.challenge.deleteMany({
            where: {
                id: {
                    in: payload.challengeId
                }
            }
        });
    }
}

export default AdminChallengeRepository;
